<!-- <script setup>
import { useBugStore } from '../stores/bugStore'
const bugStore = useBugStore()

const getStatusBadge = (status) => {
    return status === 'New' ? 'bg-sky-50 text-sky-700 ring-sky-500/20'
        : status === 'In Progress' ? 'bg-amber-50 text-amber-700 ring-amber-500/20'
            : status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 ring-emerald-500/20'
                : status === 'Closed' ? 'bg-slate-100 text-slate-700 ring-slate-400/20'
                    : 'bg-slate-50 text-slate-600 ring-slate-300/20';
};

const getPriorityBadge = (priority) => {

    return priority === 'Critical' ? 'bg-rose-50 text-rose-700 ring-rose-500/20'

        : priority === 'High' ? 'bg-amber-50 text-amber-700 ring-amber-500/20'

            : priority === 'Medium' ? 'bg-blue-50 text-blue-700 ring-blue-500/20'

                : priority === 'Low' ? 'bg-slate-100 text-slate-600 ring-slate-300/20'

                    : 'bg-slate-50 text-slate-600 ring-slate-300/20'
}

</script>

<template>
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">

                <thead>
                    <tr class="border-b border-slate-100 bg-white">
                        <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Bug ID & Title
                        </th>
                        <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Project
                        </th>
                        <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Priority
                        </th>
                        <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Status
                        </th>
                        <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Assignee
                        </th>
                        <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Created
                        </th>
                        <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            DueDate
                        </th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-slate-100 text-sm">
                    <tr v-for="bug in bugStore.filterBugs" :key="bug.id" @click="bugStore.openBugDetail(bug)"
                        class="hover:bg-slate-50/70 transition-colors group cursor-pointer">
                        <td class="py-4 px-6">
                            <div class="space-y-0.5">
                                <span class="text-xs font-semibold text-slate-400">#{{ bug.id }}</span>
                                <p class="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                    {{ bug.title }}
                                </p>
                            </div>
                        </td>

                        <td class="py-4 px-6 text-slate-600 font-medium">
                            {{ bug.project }}
                        </td>

                        <td class="py-4 px-6">
                            <span :class="getPriorityBadge(bug.priority)"
                                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset">
                                <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                                {{ bug.priority }}
                            </span>
                        </td>

                        <td class="py-4 px-6">
                            <span :class="getStatusBadge(bug.status)"
                                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset">
                                <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                                {{ bug.status }}
                            </span>
                        </td>

                        <td class="py-4 px-6">
                            <div class="flex items-center gap-2.5">
                                <div 
                                    class="w-7 h-7 rounded-full flex items-center bg-indigo-100 text-indigo-700 justify-center font-bold text-[11px] ring-1 ring-slate-200">
                                    {{ bug.assignee.initials }}
                                </div>
                                <span class="text-slate-800 font-medium">{{ bug.assignee.name }}</span>
                            </div>
                        </td>

                        <td class="py-4 px-6 text-slate-500 font-medium">
                            {{ bug.createdDate }}
                        </td>
                        <td class="py-4 px-6 text-slate-500 font-medium">
                            {{ bug.dueDate }}
                        </td>
                        <td class="py-4 px-6 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <button @click.stop="bugStore.openEditModal(bug)" title="Edit bug"
                                    class="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button @click.stop="bugStore.openDeleteModal(bug.id)" title="Delete bug"
                                    class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>

                    <tr v-if="bugStore.filterBugs.length === 0">
                        <td colspan="6" class="py-12 text-center text-slate-400">
                            No bugs found matching your filters.
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template> -->



<template>
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">

                <thead>
                    <tr class="border-b border-slate-100 bg-white">
                        <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Bug ID & Title
                        </th>
                        <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Project
                        </th>
                        <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Priority
                        </th>
                        <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Status
                        </th>
                        <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Assignee
                        </th>
                        <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Created
                        </th>
                        <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            DueDate
                        </th>
                        <th class="py-4 px-6"></th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-slate-100 text-sm">
                    <tr v-for="bug in paginatedBugs" :key="bug.id" @click="bugStore.openBugDetail(bug)"
                        class="hover:bg-slate-50/70 transition-colors group cursor-pointer">
                        <td class="py-4 px-6">
                            <div class="space-y-0.5">
                                <span class="text-xs font-semibold text-slate-400">#{{ bug.id }}</span>
                                <p class="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                    {{ bug.title }}
                                </p>
                            </div>
                        </td>

                        <td class="py-4 px-6 text-slate-600 font-medium">
                            {{ bug.project }}
                        </td>

                        <td class="py-4 px-6">
                            <span :class="getPriorityBadge(bug.priority)"
                                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset">
                                <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                                {{ bug.priority }}
                            </span>
                        </td>

                        <td class="py-4 px-6">
                            <span :class="getStatusBadge(bug.status)"
                                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset">
                                <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                                {{ bug.status }}
                            </span>
                        </td>

                        <td class="py-4 px-6">
                            <div class="flex items-center gap-2.5">
                                <div
                                    class="w-7 h-7 rounded-full flex items-center bg-indigo-100 text-indigo-700 justify-center font-bold text-[11px] ring-1 ring-slate-200">
                                    {{ bug.assignee?.initials }}
                                </div>
                                <span class="text-slate-800 font-medium">{{ bug.assignee?.name }}</span>
                            </div>
                        </td>

                        <td class="py-4 px-6 text-slate-500 font-medium">
                            {{ bug.createdDate }}
                        </td>
                        <td class="py-4 px-6 text-slate-500 font-medium">
                            {{ bug.dueDate }}
                        </td>
                        <td class="py-4 px-6 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <button @click.stop="bugStore.openEditModal(bug)" title="Edit bug"
                                    class="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button @click.stop="bugStore.openDeleteModal(bug.id)" title="Delete bug"
                                    class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>

                    <tr v-if="bugStore.filterBugs.length === 0">
                        <td colspan="8" class="py-12 text-center text-slate-400">
                            No bugs found matching your filters.
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>

        <div v-if="bugStore.filterBugs.length > perPage"
            class="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-100">
            <p class="text-xs text-slate-500">
                Showing <span class="font-semibold text-slate-700">{{ startItem }}-{{ endItem }}</span>
                of <span class="font-semibold text-slate-700">{{ bugStore.filterBugs.length }}</span> bugs
            </p>

            <div class="flex items-center gap-1">
                <button @click="currentPage--" :disabled="currentPage === 1"
                    class="px-3 h-8 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
                    Previous
                </button>

                <button v-for="page in totalPages" :key="page" @click="currentPage = page"
                    :class="page === currentPage
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-600 hover:bg-slate-100'"
                    class="w-8 h-8 rounded-lg text-xs font-semibold cursor-pointer">
                    {{ page }}
                </button>

                <button @click="currentPage++" :disabled="currentPage === totalPages"
                    class="px-3 h-8 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { computed, ref, watch } from 'vue'
import { useBugStore } from '../stores/bugStore'
const bugStore = useBugStore()

const getStatusBadge = (status) => {
    return status === 'New' ? 'bg-sky-50 text-sky-700 ring-sky-500/20'
        : status === 'In Progress' ? 'bg-amber-50 text-amber-700 ring-amber-500/20'
            : status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 ring-emerald-500/20'
                : status === 'Closed' ? 'bg-slate-100 text-slate-700 ring-slate-400/20'
                    : 'bg-slate-50 text-slate-600 ring-slate-300/20';
};

const getPriorityBadge = (priority) => {
    return priority === 'Critical' ? 'bg-rose-50 text-rose-700 ring-rose-500/20'
        : priority === 'High' ? 'bg-amber-50 text-amber-700 ring-amber-500/20'
            : priority === 'Medium' ? 'bg-blue-50 text-blue-700 ring-blue-500/20'
                : priority === 'Low' ? 'bg-slate-100 text-slate-600 ring-slate-300/20'
                    : 'bg-slate-50 text-slate-600 ring-slate-300/20'
}

const currentPage = ref(1)
const perPage = 5

const totalPages = computed(() =>
    Math.max(1, Math.ceil(bugStore.filterBugs.length / perPage))
)

const paginatedBugs = computed(() => {
    const start = (currentPage.value - 1) * perPage
    return bugStore.filterBugs.slice(start, start + perPage)
})

const startItem = computed(() =>
    bugStore.filterBugs.length === 0 ? 0 : (currentPage.value - 1) * perPage + 1
)
const endItem = computed(() =>
    Math.min(currentPage.value * perPage, bugStore.filterBugs.length)
)

watch(
    [
        () => bugStore.selectedStatus,
        () => bugStore.selectedPriority,
        () => bugStore.selectedAssign,
        () => bugStore.searchQuery,
    ],
    () => {
        currentPage.value = 1
    }
)

watch(
    () => bugStore.filterBugs.length,
    () => {
        if (currentPage.value > totalPages.value) {
            currentPage.value = totalPages.value
        }
    }
)
</script>
