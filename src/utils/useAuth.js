import { userEmailLogin, userSignUp } from '@/services/api'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { supabase } from './supabase'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('ticketapp_session')) || null)
    const loading = ref(false)
    const isAuthenticated = computed(() => !!user.value)
    const router = useRouter()
    const toast = useToast()

    const signIn = async (email, password) => {
        loading.value = true;
        try {
        const data = await userEmailLogin(email, password);
        if (data) {
            isAuthenticated.value = true
            localStorage.setItem("ticketapp_session", JSON.stringify(data));
            user.value = data
            router.replace('/dashboard') 
            toast.success("Login successful!");
        
        }
        } catch (error) {
        console.error(error)
        toast.error(error.message || 'Login failed')
        } finally {
        loading.value = false
        }

    };

    const signUp = async (email, password) => {
    loading.value = true
        try {
        const data = await userSignUp(email, password);
        if (data) {
            isAuthenticated.value = true
            localStorage.setItem("ticketapp_session", JSON.stringify(data));
            user.value = data
            setTimeout(() => {
            router.push('/dashboard')
            toast.success("Sign up successful!");
        }, 300);
        }
        } catch (error) {
        console.error(error)
        toast.error(error.message)
        } finally {
        loading.value = false
        }
    };

    const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
        toast.error(error.message || "Error logging out");
        return;
        }

        // Clear user session
        localStorage.removeItem("ticketapp_session");
        user.value = null
        isAuthenticated.value = false
            router.push('/signin')
            toast.success("You’ve been logged out successfully!");

    } catch (err) {
        console.error("Logout failed:", err);
        toast.error("Unexpected error logging out");
    }
    };

    return { user, signIn, signUp, signOut, isAuthenticated, loading }
})
