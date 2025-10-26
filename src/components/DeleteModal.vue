<script setup>
const props = defineProps({
    ticket: {
        type: Object
    },
    setDeleteModal: {
        type: Function
    }
})
import { useTicketStore } from '@/utils/useTicket';

const {deleteTicket, loading} = useTicketStore();

const handleDelete  = async()=>{
    if (!props.ticket) return
    try {
    await deleteTicket(props.ticket.id);
    console.log('this is done successfully');
    props.setDeleteModal()
    
    } catch (err) {
    console.error(err);
    }
}
</script>

<template>
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
    <!-- {/* Header */} -->
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Delete Ticket</h2>
        <button
        @click="()=> setDeleteModal()"
        className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
        >
        ✕
        </button>
    </div>

    <!-- {/* Body */} -->
    <div className="p-6 text-gray-700">
        Are you sure you want to delete <span className="font-semibold">{{ticket?.title}}</span>? This action cannot be undone.
    </div>

    <!-- {/* Footer */} -->
    <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
        <button
        :disabled="loading"
        @click="()=> setDeleteModal()"
        className="px-4 cursor-pointer py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        >
        Cancel
        </button>
        <button
        :disabled="loading"
        @click="handleDelete"
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
        {{loading ? 'Deleting' : 'Delete'}}
        </button>
    </div>
    </div>
</div>
</template>