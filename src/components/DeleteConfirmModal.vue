<template>
    <div v-if="bugStore.isDeleteModalOpen"
        class="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
        @click.self="bugStore.closeDeleteModal()">

        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md px-8 pt-10 pb-6 text-center">
            <div class="mx-auto w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-width="3" d="M12 5v8m0 5v.01" />
                </svg>
            </div>

            <h2 class="mt-5 text-3xl font-extrabold text-slate-900 tracking-tight">
                Delete this bug?
            </h2>
            <p class="mt-3 text-sm text-slate-400 leading-relaxed">
                This action cannot be undone. The issue and its comments will be permanently removed.
            </p>

            <hr class="mt-8 border-slate-100" />

            <div class="mt-5 flex items-center justify-end gap-3">
                <button type="button" @click="bugStore.closeDeleteModal()"
                    class="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                    Cancel
                </button>
                <button type="button" @click="bugStore.confirmDelete()"
                    class="px-5 py-2.5 text-sm font-bold text-white bg-rose-400 hover:bg-rose-500 rounded-xl transition-colors cursor-pointer">
                    Delete bug
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useBugStore } from "../stores/bugStore";

const bugStore = useBugStore();
</script>