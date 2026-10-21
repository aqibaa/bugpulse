<template>
    <div>
        <div v-if="bugStore.isDetailDrawerOpen" @click="bugStore.closeBugDetail()"
            class="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-2xs transition-opacity duration-300"></div>
        <aside
            class="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-2xl border-l border-s-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col justify-between"
            :class="bugStore.isDetailDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                ">
            <div v-if="bug" class="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="text-sm font-bold text-indigo-600 tracking-tight">
                            #{{ bug.id }}
                        </span>
                        <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 border">
                            {{ bug.status }}
                        </span>
                    </div>
                    <button @click="bugStore.closeBugDetail()"
                        class="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="space-y-2">
                    <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight wrap-break-word">
                        {{ bug.title }}
                    </h2>

                    <p class="text-sm text-slate-500 leading-relaxed wrap-break-word">
                        {{ bug.description || "No description provided." }}
                    </p>
                </div>
                <hr class="border-slate-100" />

                <div class="grid grid-cols-2 gap-y-5 gap-x-6 text-sm">
                    <div class="space-y-1">
                        <span class="text-xs text-slate-400 font-medium"> Project </span>
                        <p class="font-bold text-slate-900">{{ bug.project }}</p>
                    </div>
                    <div class="space-y-1">
                        <span class="text-xs text-slate-400 font-medium"> Priority </span>
                        <p class="font-bold text-slate-900">{{ bug.priority }}</p>
                    </div>
                    <div class="space-y-1">
                        <span class="text-xs text-slate-400 font-medium"> Severity </span>
                        <p class="font-bold text-slate-900">
                            {{ bug.severity || "Major" }}
                        </p>
                    </div>
                    <div class="space-y-1">
                        <span class="text-xs text-slate-400 font-medium"> Assignee </span>
                        <p class="font-bold text-slate-900">{{ bug.assignee.name }}</p>
                    </div>
                    <div class="space-y-1">
                        <span class="text-xs text-slate-400 font-medium"> Repoter </span>
                        <p class="font-bold text-slate-900">{{ bug.reporter }}</p>
                    </div>
                    <div class="space-y-1">
                        <span class="text-xs text-slate-400 font-medium"> Created </span>
                        <p class="font-bold text-slate-900">{{ bug.createdDate }}</p>
                    </div>
                    <div class="space-y-1">
                        <span class="text-xs text-slate-400 font-medium"> DueDate </span>
                        <p class="font-bold text-slate-900">{{ bug.dueDate }}</p>
                    </div>
                </div>

                <div class="space-y-2 pt-2">
                    <div class="flex items-center gap-2 flex-wrap">
                        <button v-for="stat in statuses" :key="stat" type="button"
                            @click="bugStore.updateBugStatus(bug.id, stat)"
                            class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer"
                            :class="bug.status === stat
                                ? 'border-2 border-indigo-600 text-indigo-700 bg-indigo-50/60 shadow-2xs font-bold'
                                : 'border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                ">
                            {{ stat }}
                        </button>
                    </div>
                </div>
                <hr class="border-slate-100" />

                <div class="space-y-4">
                    <div class="flex items-center gap-2">
                        <h3 class="font-bold text-slate-900 text-base">Comments</h3>
                        <span
                            class="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                            {{ bug.comments?.length || 0 }}
                        </span>
                    </div>
                    <div v-if="bug.comments && bug.comments.length > 0" class="space-y-3">
                        <div v-for="comment in bug.comments" :key="comment.id"
                            class="flex items-start gap-3 bg-slate-50/60 p-3.5 rounded-2xl border border-slate-100  animate-fadeIn">
                            <div
                                class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                                {{ comment.initials || 'G' }}
                            </div>
                            <div class="space-y-1 text-sm flex-1">
                                <div class="flex items-baseline justify-between">
                                    <span class="font-bold text-slate-900">{{ comment.author }}</span>
                                    <span class="text-[11px] text-slate-400">{{ comment.createdAt }}</span>
                                </div>
                                <p class="text-slate-600 text-xs leading-relaxed">
                                    {{ comment.text }}
                                </p>
                            </div>
                        </div>
                    </div>


                    <div v-else
                        class="text-center py-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400">
                        No comments yet. Be the first to add one!
                    </div>

                    <div class="space-y-2  pt-2">
                        <textarea v-model="commentText" rows="3" placeholder="Add A comment..."
                            class="w-full p-3 text-sm bg-white border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all resize-y"
                            :class="commentError ? 'border-rose-400 bg-rose-50/20' : ''">
            </textarea>

                        <p v-if="commentError" class="text-xs text-rose-500 font-medium">
                            {{ commentError }}
                        </p>

                        <button @click="handlePostComment" type="button"
                            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer">
                            Comment
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="bug" class="p-6 border-t border-slate-100 bg-white flex items-center gap-4">
                <button type="button" @click="handleEdit"
                    class="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-2xs">
                    <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Edit bug</span>
                </button>

                <button @click="handleDelete" type="button"
                    class="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer">
                    Delete
                </button>
            </div>
        </aside>
    </div>
</template>


<script setup>
import { computed, ref } from "vue";
import { useBugStore } from "../stores/bugStore";

const bugStore = useBugStore();
const bug = computed(() => bugStore.selectedBugDetail);

const statuses = ["New", "In Progress", "Resolved", "Closed"];

const commentText = ref("");
const commentError = ref("");

const handlePostComment = () => {
    if (!commentText.value.trim()) {
        commentError.value = "Please write a comment before posting";
        return;
    }

    commentError.value = "";
    bugStore.addComment(bug.value.id, commentText.value);
    commentText.value = "";
};

const handleEdit = () => {
    if (!bug.value) return;
    bugStore.openEditModal(bug.value);
    bugStore.closeBugDetail();
};
const handleDelete = () => {
    if (!bug.value) return;
    bugStore.openDeleteModal(bug.value.id)
};
</script>