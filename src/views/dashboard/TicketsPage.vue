<script setup>
import DeleteModal from '@/components/DeleteModal.vue';
import Spinner from '@/components/Spinner.vue';
import TicketCard from '@/components/TicketCard.vue';
import TicketModal from '@/components/TicketModal.vue';
import { useTicketStore } from '@/utils/useTicket';
import { Plus } from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const ticketStore = useTicketStore()
const tickets = computed(() => ticketStore.allTickets)
const route = useRoute()
const action = computed(() => route.query.action)
const ticketToDelete = ref();
const openDeleteModal = ref(false);

const handleDelete = (ticket)=>{
    ticketToDelete.value = ticket;
    openDeleteModal.value = true
}

const setDeleteModal = ()=>{
    openDeleteModal.value = !openDeleteModal
}


onMounted(async () => {
    const data = await ticketStore.fetchAllTickets()
})

watch([() => route.query.id, () => route.query.action], async ([newId, newAction]) => {
  if (newAction === 'edit' && newId) {
      const fetched = await ticketStore.getTicketbyId(newId)
      console.log(fetched);
      
  }
}, { immediate: true })

</script>

<template>
    <div v-if="ticketStore.loading" class="h-screen flex justify-center items-center"><Spinner /></div>
        <section v-else className="min-h-screen overflow-y-scroll w-full bg-linear-to-br from-gray-50 to-blue-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start sm:items-center justify-between gap-4 mb-8">

            <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Ticket Management</h1>
            <p className="text-gray-600">Create, view, edit, and manage all your tickets</p>
            </div>

            <RouterLink
            to="/dashboard/tickets?action=create"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
            <Plus className="w-5 h-5" />
            Create Ticket
            </RouterLink>
        </div>

            <div v-if="!tickets || tickets.length === 0" className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <p className="text-gray-500 text-lg">
                No tickets yet. Create your first ticket to get started!
            </p>
            </div>
            <div v-else className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TicketCard
                v-for="ticket in tickets"
                :key="ticket.id"
                :ticket="ticket" 
                :onDelete="handleDelete"
                />
            </div>
        </div>

        <TicketModal v-if="action" /> 
        <DeleteModal v-if="openDeleteModal" :ticket="ticketToDelete" :setDeleteModal="setDeleteModal" />  
    </section>


</template>
