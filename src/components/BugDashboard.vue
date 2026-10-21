<template>
    <div class="space-y-6">
        <div class="space-y-1">
            <div class="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                {{currentDate}}
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                Good Morning {{authStore.loggedInUser.name}}
                <span class="text-indigo-600 text-xl">✦</span>
            </h1>
            <p class="text-sm text-slate-500">
                Here's what's happening with your bugs today.
            </p>
        </div>


        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            <div
                class="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between text-slate-400">
                    <span class="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                        Total-Bugs
                    </span>
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <div class="my-3 flex items-baseline justify-between">
                    <span class="text-3xl font-extrabold text-slate-900">{{bugStore.stats.total}}</span>
                    <span class="text-xs text-slate-400 font-medium">All Time</span>
                </div>
                <div class="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div class="bg-sky-500 h-full w-4/5 rounded-full"></div>
                </div>
            </div>
            <div
                class="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between text-slate-400">
                    <span class="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                       New
                    </span>
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <div class="my-3 flex items-baseline justify-between">
                    <span class="text-3xl font-extrabold text-slate-900">{{bugStore.stats.newbugs}}</span>
                    <span class="text-xs text-slate-400 font-medium">of Total</span>
                </div>
                <div class="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div class="bg-sky-500 h-full w-2/5 rounded-full"></div>
                </div>
            </div>
            <div
                class="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between text-slate-400">
                    <span class="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                        InProgress
                    </span>
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <div class="my-3 flex items-baseline justify-between">
                    <span class="text-3xl font-extrabold text-slate-900">{{bugStore.stats.inProgress}}</span>
                    <span class="text-xs text-slate-400 font-medium">of Total</span>
                </div>
                <div class="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div class="bg-amber-400 h-full w-2/5 rounded-full"></div>
                </div>
            </div>
            <div
                class="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between text-slate-400">
                    <span class="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                        Resolved
                    </span>
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <div class="my-3 flex items-baseline justify-between">
                    <span class="text-3xl font-extrabold text-slate-900">{{ bugStore.stats.resolved }}</span>
                    <span class="text-xs text-slate-400 font-medium">of Total</span>
                </div>
                <div class="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div class="bg-emerald-500 h-full w-1/5 rounded-ful"></div>
                </div>
            </div>
            <div
                class="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between text-slate-400">
                    <span class="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                        Closed
                    </span>
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <div class="my-3 flex items-baseline justify-between">
                    <span class="text-3xl font-extrabold text-slate-900">{{bugStore.stats.closed}}</span>
                    <span class="text-xs text-slate-400 font-medium">of Total</span>
                </div>
                <div class="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div class="bg-slate-400 h-full w-1/5 rounded-full"></div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useBugStore } from '../stores/bugStore';

const bugStore = useBugStore()
const authStore = useAuthStore()


const currentDate = computed(() => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});
</script>