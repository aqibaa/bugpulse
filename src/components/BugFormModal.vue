<template>
    <div v-if="bugStore.isFormModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop:blur-xs transition-opacity duration-200"
        @click.self="bugStore.closeFormModal()">
        <div
            class="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-xl p-6 sm:p-8 space-y-8 relative animate-scaleIn">
            <button @click="bugStore.closeFormModal()"
                class="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div class="space-y-2">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {{ isEditMode ? "EDIT ISSUE" : "NEW ISSUE" }}
                </span>
                <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {{ isEditMode ? "Edit bug" : "Report a bug" }}
                </h2>
                <p class="text-sm text-slate-500">
                    Capture the details your team needs to resolve this issue.
                </p>
            </div>
            <form class="space-y-1" @submit.prevent="handleSubmit">
                <div class="space-y-1.5">
                    <label class="block text-xs font-bold text-slate-700">
                        Title *
                    </label>
                    <input v-model="form.title" type="text" placeholder="What went wrong?"
                        class="w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-slate-900 placeholder-slate-400 border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                        :class="errors.title
                            ? 'border-rose-400 bg-rose-50/20'
                            : 'border-slate-200'
                            " />
                    <p v-if="errors.title" class="text-xs text-rose-500 font-medium">
                        {{ errors.title }}
                    </p>
                </div>

                <div class="space-y-2">
                    <label class="block text-xs font-bold text-slate-700 pt-2">
                        Description *
                    </label>
                    <textarea v-model="form.description" type="text"
                        placeholder="Describe the expected and actual behavior..."
                        class="w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl text-slate-900 placeholder-slate-400 border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                        :class="errors.description
                            ? 'border-rose-400 bg-rose-50/20'
                            : 'border-slate-200'
                            "></textarea>
                    <p v-if="errors.description" class="text-xs text-rose-500 font-medium">
                        {{ errors.description }}
                    </p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    <div class="space-y-1.5">
                        <label class="block text-xs font-bold text-slate-700">Project</label>
                        <div class="relative">
                            <select v-model="form.project"
                                class="w-full appearance-none px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 cursor-pointer">
                                <option value="Core App">Core App</option>
                                <option value="Core Platform">Core Platform</option>
                                <option value="Web App">Web App</option>
                                <option value="Reporting">Reporting</option>
                            </select>
                            <span
                                class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div class="space-y-1.5">
                        <label class="block text-xs font-bold text-slate-700">Priority</label>
                        <div class="relative">
                            <select v-model="form.priority"
                                class="w-full appearance-none px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 cursor-pointer">
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                            </select>
                            <span
                                class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div class="space-y-1.5">
                        <label class="block text-xs font-bold text-slate-700">Severity</label>
                        <div class="relative">
                            <select v-model="form.severity"
                                class="w-full appearance-none px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 cursor-pointer">
                                <option value="Minor">Minor</option>
                                <option value="Major">Major</option>
                                <option value="Critical">Critical</option>
                                <option value="Blocker">Blocker</option>
                            </select>
                            <span
                                class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-xs font-bold text-slate-700">Assignee</label>
                        <div class="relative">
                            <select v-model="form.assigneeEmail"
                                class="w-full appearance-none px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 cursor-pointer"
                                :class="[
                                    errors.assignee ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200',
                                    form.assigneeEmail === '' ? 'text-slate-400' : 'text-slate-900'
                                ]">
                                <option value="" disabled>Choose an assignee</option>

                                <option v-for="member in teamMember" :key="member.email" :value="member.email"
                                    class="text-slate-900">
                                    {{ member.name }}{{ member.email === authStore.loggedInUser?.email ? " (You)" : ""
                                    }}
                                </option>
                            </select>
                            <span
                                class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </div>
                        <p v-if="errors.assignee" class="text-xs text-rose-500 font-medium">
                            {{ errors.assignee }}
                        </p>
                    </div>
                </div>


                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div class="space-y-2 ">
                        <label class="block text-xs font-bold text-slate-700">Reporter</label>


                        <input type="text" v-model="form.reporter"
                            class="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600" />
                    </div>

                    <div class="space-y-1.5">
                        <label class="block text-xs font-bold text-slate-700">Due date</label>
                        <input type="date" v-model="form.dueDate"
                            class="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600" />
                    </div>
                </div>


                <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-5">
                    <button type="button" @click="bugStore.closeFormModal"
                        class="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                        Cancel
                    </button>
                    <button type="submit"
                        class="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-sm transition-all">
                        {{ isEditMode ? 'Save changes' : 'Create bug' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useBugStore } from "../stores/bugStore";
import { useAuthStore } from "../stores/authStore";

const bugStore = useBugStore();
const authStore = useAuthStore()

const teamMember = computed(() => authStore.teamMembers)

const form = ref({
    title: "",
    description: "",
    project: "Core App",
    priority: "Medium",
    severity: "Major",
    assigneeEmail: "",
    reporter: authStore.loggedInUser?.name || "Guest",
    dueDate: "",
});

const errors = ref({
    title: "",
    description: "",
    assignee: "",
});

watch(
    () => bugStore.isFormModalOpen,
    (isOpen) => {
        if (isOpen) {
            errors.value.title = "";
            errors.value.description = "";
            if (bugStore.editingbug) {
                form.value.title = bugStore.editingbug.title;
                form.value.description = bugStore.editingbug.description || "";
                form.value.priority = bugStore.editingbug.priority;
                form.value.project = bugStore.editingbug.project;
                form.value.reporter = bugStore.editingbug.reporter;
                form.value.severity = bugStore.editingbug.severity || "Major";
                form.value.assigneeEmail = bugStore.editingbug.assignee?.email || "Name";
                form.value.dueDate = bugStore.editingbug.dueDate || "";
            } else {
                form.value.title = "";
                form.value.description = "";
                form.value.project = "Core App";
                form.value.priority = "Medium";
                form.value.reporter = authStore.loggedInUser?.name || 'guest'
                form.value.severity = "Major";
                form.value.assigneeEmail = "";
                form.value.dueDate = "";
            }
        }
    }
);

const isEditMode = computed(() => !!bugStore.editingbug);

const handleSubmit = () => {
    errors.value.title = "";
    errors.value.description = "";
    errors.value.assignee = "";
    let isValid = true;

    if (!form.value.title.trim()) {
        errors.value.title = "Title is required";
        isValid = false;
    }
    if (!form.value.description.trim()) {
        errors.value.description = "Description is required";
        isValid = false;
    }

    if (!form.value.assigneeEmail) {
        errors.value.assignee = "Please choose an assignee";
        isValid = false;
    }

    if (!isValid) return;

    const selectedMember =
        teamMember.value.find((m) => m.email === form.value.assigneeEmail);

    bugStore.saveBug({
        title: form.value.title.trim(),
        description: form.value.description.trim(),
        project: form.value.project,
        priority: form.value.priority,
        reporter: form.value.reporter,
        severity: form.value.severity,
        assignee: selectedMember,
        dueDate: form.value.dueDate,
    });
};
</script>
