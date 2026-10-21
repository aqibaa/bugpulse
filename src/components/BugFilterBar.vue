

<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3 py-2">

    <div class="flex items-center flex-wrap gap-2.5">
      <div class="flex items-center gap-1.5 text-slate-700 font-semibold text-sm pr-1">
        <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span>Filters</span>
      </div>

      <div class="relative">
        <select v-model="selectedStatus"
          class="appearance-none bg-white text-xs font-medium text-slate-700 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer shadow-2xs hover:border-slate-300 transition-colors">
          <option value="All">All statuses</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
        <span class="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      <div class="relative">
        <select v-model="selectedPriority"
          class="appearance-none bg-white text-xs font-medium text-slate-700 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer shadow-2xs hover:border-slate-300 transition-colors">
          <option value="All">All priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
        <span class="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      <div class="relative">
        <select v-model="selectedAssign"
          class="appearance-none bg-white text-xs font-medium text-slate-700 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer shadow-2xs hover:border-slate-300 transition-colors">
          <option value="All">All assignees</option>
          <option v-for="member in authStore.teamMembers" :key="member.email" :value="member.email">
            {{ member.name }}{{ member.email === authStore.loggedInUser?.email ? ' (You)' : '' }}
          </option>
        </select>
        <span class="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      <button v-if="hasActiveFilters" @click="bugStore.clearFilters()"
        class="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 px-2.5 py-1.5 rounded-lg border border-rose-200 transition-all duration-150 animate-fadeIn">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span>Clear filters</span>
      </button>
    </div>


    <div class="inline-flex bg-slate-200/70 p-1 rounded-xl self-start sm:self-auto border border-slate-200">

      <button @click="bugStore.currentView = 'table'"
        :class="bugStore.currentView === 'table' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <span>Table</span>
      </button>

      <button @click="bugStore.currentView = 'board'"
        :class="bugStore.currentView === 'board' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
        <span>Board</span>
      </button>
    </div>

  </div>
</template>
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBugStore } from '../stores/bugStore'
import { useAuthStore } from '../stores/authStore'

const bugStore = useBugStore()
const authStore = useAuthStore()

const { selectedStatus, selectedPriority, selectedAssign, searchQuery } = storeToRefs(bugStore)

const hasActiveFilters = computed(() => {
  return selectedStatus.value !== 'All' ||
    selectedPriority.value !== 'All' ||
    selectedAssign.value !== 'All' ||
    searchQuery.value.trim() !== ''
})
</script>