<script setup>
import { useAuthStore } from '@/utils/useAuth';
import { defineProps, ref } from 'vue';
const props = defineProps({
    isOpen: {
        type: Boolean,
    },
})

const isLoading  = ref(false)

const emit = defineEmits(['update:isOpen']);

const auth = useAuthStore();

    const handleSignout = async ()=>{
    isLoading.value = true
    await auth.signOut()
    emit('update:isOpen', false)
    isLoading.value = false
    }

</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div class="bg-amber-200 p-6 rounded-2xl shadow-xl text-center max-w-sm w-full">
            <h2 class="text-lg font-semibold mb-4">Are you sure you want to sign out?</h2>
            <div class="flex justify-center gap-3">
                <button
                    @click="handleSignout"
                    :disabled="isLoading"
                    :class="`px-4 py-2 rounded-lg transition font-medium flex items-center justify-center gap-2 ${isLoading ? 'bg-red-400 cursor-not-allowed text-white' : 'bg-red-600 text-white hover:bg-red-700'}`"
                >
                    {{isLoading ? "signing out" : 'Yes, Sign Out'}}
                </button>
                <button
                    @click="emit('update:isOpen', false)"
                    class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>

</template>