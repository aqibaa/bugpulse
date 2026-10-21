import { defineStore } from "pinia";
import { ref, computed } from "vue";
import router from "../router";

export const useAuthStore = defineStore(
    'auth', () => {
        const loggedInUser = ref(JSON.parse(localStorage.getItem("loggedInUser") || null))
        const registeredUsers = ref(JSON.parse(localStorage.getItem("registeredUsers")) || [])
        const getInitials = (name) =>
            name.split(" ").map(word => word[0]).join("").toUpperCase().slice(0, 2)


        const teamMembers = computed(() =>
            registeredUsers.value.map(user => ({
                name: user.name,
                email: user.email,
                initials: getInitials(user.name)
            }))
        )


        const msg = ref('');
        const isError = ref(false);

        const clearMessage = () => {
            msg.value = '';
            isError.value = false;
        }



        const signup = (name, email, password) => {
            if (!name || !email || !password) {
                msg.value = 'All Fields Are Required!'
                isError.value = true;
                return false;
            }



            const existingUser = registeredUsers.value.find((user) => user.email === email);
            if (existingUser) {
                msg.value = ' This email is already registered. Please Login!'
                isError.value = true;
                return false
            }

            const newUser = { name, email, password }
            registeredUsers.value.push(newUser);
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers.value))
            msg.value = 'Account created Successfully!'
            isError.value = false;
            return true
        }


        const login = (email, password) => {
            if (!email || !password) {
                msg.value = 'please Enter email And Password!';
                isError.value = true;
                return false
            }

            const savedUser = registeredUsers.value.find((user) => user.email === email && user.password === password);
            if (!savedUser) {
                msg.value = 'Invalid Email or Password';
                isError.value = true;
                return false;
            }

            const userData = { name: savedUser.name, email: savedUser.email }
            localStorage.setItem('loggedInUser', JSON.stringify(userData))

            loggedInUser.value = userData;
            msg.value = `Welcome back, ${savedUser.name}! Redirecting...`;
            isError.value = false;
            return true;


        }

        const logout = () => {
            localStorage.removeItem("loggedInUser");
            loggedInUser.value = null
            router.push('/login')
            clearMessage()
        }
        return {
            loggedInUser, login, signup, msg, isError, clearMessage, logout, teamMembers, getInitials,
        }

    }
)