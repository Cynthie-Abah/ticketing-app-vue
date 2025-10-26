import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { getTickets, getTicketbyId as getTicketbyIdApi, createTicket, deleteTicket as deleteTicketApi, editTicket} from '@/services/api'

export const useTicketStore = defineStore('tickets', () => {
    const allTickets = ref([])
    const ticket = ref({})
    const loading = ref(false)
    const toast = useToast()
// READ - DONE
    const fetchAllTickets = async () => {
        loading.value = true;
        try {
        const data = await getTickets();
        if (data) {
            allTickets.value = data
            console.log('tickets was fetched ', allTickets.value);
            return data
        }
        return []
        } catch (error) {
        console.error(error)
        toast.error(error.message || 'Error loading tickets. please try again')
        } finally {
        loading.value = false
        }

    };
// done
    const getTicketbyId = async (id) => {
        loading.value = true;
        try {
        const data = await getTicketbyIdApi(id);
        if (data) {
            ticket.value = data 
            return data
        }
        } catch (error) {
        console.error(error)
        toast.error(error.message || 'Error loading ticket. Please try again')
        } finally {
        loading.value = false
        }
    };
// CREATE - DONE 
    const createNewTicket = async (formdata) => {
    loading.value = true
        try {
        const data = await createTicket(formdata);
        if (data) {
            await fetchAllTickets();
            toast.success('Your Ticket was Created Successfully')
        }
        } catch (error) {
        console.error(error)
        toast.error(error.message || 'Error creating new Ticket pls try again')
        } finally {
        loading.value = false
        }
    };
// UPDATE - DONE
    const updateTicket = async (formdata, id) => {
    loading.value = true
        try {
        const data = await editTicket(formdata, id);
        if (data) {
            await fetchAllTickets();
            toast.success(`Successfully updated ${formdata.title}.`)
            console.log('update ticket is done');
            
        }
        } catch (error) {
        console.error(error)
        toast.error(error.message || `Error updating ${formdata.title}. Please try again`)
        } finally {
        loading.value = false
        }
    };
// DELETE - DONE
    const deleteTicket = async (id) => {
    try {
        await deleteTicketApi(id);
        await fetchAllTickets();
        toast.success('Ticket successfully deleted!')

    } catch (err) {
        console.error(err);
        toast.error("Unexpected error ");
    }
    };

    return { allTickets, ticket, loading, fetchAllTickets, getTicketbyId, createNewTicket, updateTicket, deleteTicket }
})
