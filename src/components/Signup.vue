<template>
    <div class="min-h-screen bg-linear-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-white rounded-3xl shadow-xl border-xl border border-slate-100 p-8 sm:p-10">
            <div class="flex items-center gap-3 mb-8">
                <div class="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                </div>
                <div>
                    <p class="font-extrabold text-slate-900 leading-tight">BugPulse</p>
                    <p class="text-xs text-slate-400">Issue management</p>
                </div>
            </div>

            <p class="text-xs font-bold tracking-wider text-slate-400 uppercase mb-1">
                Workspace Access
            </p>
            <h1 class="text-3xl font-extrabold text-slate-900 mb-1 pt-2">
                Create your account
            </h1>
            <p class="text-sm text-slate-500 pt-2">
                Join your team and start tracking bugs.
            </p>

            <p class="mb-4 p-2.5 rounded-xl text-sm text-center font-semibold">
                {{ authStore.msg }}
            </p>

            <form @submit.prevent="handleSignUp" class="space-y-5">
                <div class="space-y-1.5">
                    <label class="block text-sm font-bold text-slate-900">Full name</label>
                    <input type="text" v-model="name" placeholder="Aqib.." required
                        class="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all" />
                </div>
                <div class="space-y-1.5">
                    <label class="block text-sm font-bold text-slate-900">Email address</label>
                    <input type="email" v-model="email" placeholder="@gmail.com" required
                        class="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all" />
                </div>
                <div class="space-y-1.5">
                    <label class="block text-sm font-bold text-slate-900">Email address</label>
                    <input type="password" v-model="password" placeholder="At least 6 character" minlength="6" required
                        class="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all" />
                </div>
                <button type="submit"
                    class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-sm transition-colors cursor-pointer">
                    Create account
                </button>
            </form>
            <p class="text-center text-sm text-slate-500 mt-6">
                Already have an account?
                <router-link to="/login" class="text-indigo-600 font-bold hover:underline">Sign in</router-link>
            </p>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore();
onMounted(()=>{
    authStore.clearMessage()
})

const handleSignUp = () => {
    const success = authStore.signup(name.value, email.value, password.value);
    if (success) {
        setTimeout(() => {
            router.push("/login");
        }, 1000);
    }
};
</script>