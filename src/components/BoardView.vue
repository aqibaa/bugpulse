<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4 items-start">
        <div v-for="col in columns" :key="col.status" class="min-w-0">
            <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200/80">
                <div class="flex items-center gap-2.5">
                    <span class="w-2.5 h-2.5 rounded-full" :class="col.dot"></span>
                    <h3 class="font-bold text-slate-900 text-sm">{{ col.status }}</h3>
                    <span class="text-xs font-semibold bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded-full">
                        {{ columnBugs[col.status].length }}
                    </span>
                </div>
            </div>

            <draggable :model-value="columnBugs[col.status]" group="bugs" item-key="id" :sort="false"
                ghost-class="opacity-40" class="flex flex-col gap-3 min-h-30 pb-4"
                @change="onChange($event, col.status)">
                <template #item="{ element: bug }">
                    <div @click="bugStore.openBugDetail(bug)"
                        class="bg-white rounded-xl border border-slate-200/80 shadow-xs p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between text-xs">
                            <span class="flex items-center gap-1.5 text-slate-400">
                                <span class="w-1.5 h-1.5 rounded-full" :class="priorityDot[bug.priority]"></span>
                                {{ bug.priority }}
                            </span>
                            <span class="text-slate-300">#{{ bug.id }}</span>
                        </div>


                        <h4 class="mt-3 text-sm font-bold text-slate-900 leading-snug">{{ bug.title }}</h4>
                        <p class="mt-1.5 text-xs text-slate-400 leading-relaxed line-clamp-2">
                            {{ bug.description }}
                        </p>


                        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <div
                                    class="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center">
                                    {{ bug.assignee?.initials }}
                                </div>
                                <span class="text-xs text-slate-500">{{ firstName(bug.assignee?.name) }}</span>
                            </div>

                            <div class="flex items-center gap-3 text-xs">
                                <span v-if="bug.dueDate" class="flex items-center gap-1"
                                    :class="isOverdue(bug.dueDate) ? 'text-rose-500' : 'text-slate-400'">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="9" stroke-width="2" />
                                        <path stroke-linecap="round" stroke-width="2" d="M12 7v5l3 2" />
                                    </svg>
                                    {{ formatDate(bug.dueDate) }}
                                </span>
                                <span class="flex items-center gap-1 text-slate-400">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 10h8M8 14h5m-9 6l2.5-3H19a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14z" />
                                    </svg>
                                    {{ bug.comments?.length || 0 }}
                                </span>
                            </div>
                        </div>
                    </div>
                </template>
            </draggable>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import draggable from "vuedraggable";
import { useBugStore } from "../stores/bugStore";

const bugStore = useBugStore();

const columns = [
    { status: "New", dot: "bg-sky-500" },
    { status: "In Progress", dot: "bg-amber-400" },
    { status: "Resolved", dot: "bg-emerald-500" },
    { status: "Closed", dot: "bg-slate-400" },
];

const priorityDot = {
    Low: "bg-slate-400",
    Medium: "bg-sky-500",
    High: "bg-amber-400",
    Critical: "bg-rose-500",
};

const columnBugs = computed(() => {
    const result = {};
    columns.forEach((col) => {
        result[col.status] = bugStore.filterBugs.filter((b) => b.status === col.status);
    });
    return result;
});

const onChange = (event, status) => {
    if (event.added) {
        bugStore.updateBugStatus(event.added.element.id, status);
    }
};

const firstName = (name) => (name || "").split(" ")[0];

const parseDate = (d) => new Date(d + "T00:00:00");

const formatDate = (d) =>
    parseDate(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const isOverdue = (d) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return parseDate(d) < today;
};
</script>