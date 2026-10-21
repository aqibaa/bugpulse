<template>
    <header class="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div class="flex items-center gap-6">
                <div class="flex items-center justify-center gap-2.5">
                    <div
                        class="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                    </div>
                    <span class="font-bold text-lg text-slate-900 tracking-tight">BugPulse</span>
                </div>
                <button
                    class="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
                    <span>Core Platform</span>
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            <div class="flex items-center gap-8 ">
                <div class="relative hidden md:block w-72 ">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input type="text" v-model="bugStore.searchQuery" placeholder="Search Bugs..."
                        class="w-full pl-9 pr-12 py-1.5 text-sm bg-slate-50 
                    border border-slate-200 rounded-xl text-slate-900
                     placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>

                <button
                    class="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full"></span>
                </button>
                <div
                    class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-xs flex items-center justify-center cursor-pointer border border-indigo-200">
                    {{ initials }}
                </div>
                <button @click="authStore.logout(); showUserMenu = false"
                    class="text-left px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg shadow-sm transition-all cursor-pointer font-semibold flex items-center gap-2">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign out</span>
                </button>
                <button @click="bugStore.openCreateModal()"
                    class="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Report bug</span>
                </button>
            </div>
        </div>

    </header>
</template>
<script setup>
import { useAuthStore } from '../stores/authStore';
import { useBugStore } from '../stores/bugStore';

const bugStore = useBugStore()
const authStore = useAuthStore()


const currentUserName = authStore.loggedInUser.name || "Guest"
const initials = currentUserName
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

</script>