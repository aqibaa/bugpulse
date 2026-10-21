import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../components/DashboardView.vue";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";

const routes = [
    {
        path: '/signup',
        component: Signup
    },
    {
        path: '/login',
        component: Login
    },
    {
        path:'/',
        component:DashboardView
    }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router