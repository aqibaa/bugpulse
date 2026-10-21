<script setup>
import AppHeader from './AppHeader.vue';
import BugDashboard from './BugDashboard.vue';
import BugFilterBar from './BugFilterBar.vue';
import BugTableView from './BugTableView.vue';
import BugFormModal from './BugFormModal.vue';
import BugDetailDrawer from './BugDetailDrawer.vue';
import { useAuthStore } from '../stores/authStore.js';
import { onMounted } from 'vue';
import router from '../router/index.js';
import DeleteConfirmModal from './DeleteConfirmModal.vue';
import { useBugStore } from '../stores/bugStore.js';
import BoardView from './BoardView.vue';



const authStore = useAuthStore()
const bugStore = useBugStore()

onMounted(() => {
    if (!authStore.loggedInUser) {
        router.push('/login')
    }
});

</script>

<template>
    <div class="min-h-screen bg-slate-50/60 font-sans text-slate-900 antialiased">
        <AppHeader></AppHeader>
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
            <BugDashboard v-if="bugStore.currentView === 'table'" />
            <BugFilterBar />
            <BugTableView v-if="bugStore.currentView === 'table'" />
            <BoardView v-else />
        </main>
        <BugFormModal />
        <BugDetailDrawer />
        <DeleteConfirmModal />
    </div>
</template>
