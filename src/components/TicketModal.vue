<script setup>
import { useTicketStore } from '@/utils/useTicket';
import { AlertCircle, X } from 'lucide-vue-next';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';
import Spinner from './Spinner.vue';


const route = useRoute()
const router = useRouter()
const action = computed(() => route.query.action)
const isSubmitting = ref(false)
const { ticket, loading, updateTicket, createNewTicket} = useTicketStore()

// Separate initialValues for vee-validate (only assigned once)
const formInitialValues = ref({
    title: action.value === 'edit' ? ticket.title : '',
    description: action.value === 'edit' ? ticket.description : '',
    status: action.value === 'edit' ? ticket.status : 'open',
    priority: action.value === 'edit' ? ticket.priority : 'low',
})

const handleClose = () => router.push('/dashboard/tickets')

const schema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string(),
    status: yup.string().required('Status is required'),
    priority: yup.string(),
})

const onSubmit = async (values) => {
    console.log(values, 'in onsubmit');

    if (action.value == 'edit') {
        if (!ticket.id) throw new Error('Invalid/No ID available')

        try {
        await updateTicket(values, ticket.id);
        console.log('this is done successfully');
        handleClose()
        
        } catch (err) {
        console.error(err);
        }
      } else {

        try {
        await createNewTicket(values);
        console.log('this is done successfully');
        handleClose()
        
        } catch (err) {
        console.error(err);
        }

      }
}
</script>

<template>
  <div v-if="loading || (action == 'edit' && ticket.title == '')" class="h-screen flex justify-center items-center">
    <Spinner />
  </div>

  <div v-else class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
    <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-xl border border-gray-200">
      
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {{ action === 'edit' ? "Edit Ticket" : "Create Ticket" }}
        </h2>
        <button @click="handleClose" class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Form -->
      <Form :initial-values="formInitialValues" :validation-schema="schema" @submit="onSubmit" class="p-6 space-y-6">

        <Field name="title" v-slot="{ field, meta }">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title <span class="text-red-600">*</span></label>
            <input v-bind="field"
              class="w-full px-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              :class="meta.touched && !meta.valid ? 'border-red-500' : 'border-gray-300'"
              placeholder="Enter ticket title"
            />
            <div v-if="meta.touched && !meta.valid" class="flex items-center gap-1 mt-2 text-red-600 text-sm">
              <AlertCircle class="w-4 h-4" />
              <ErrorMessage name="title" />
            </div>
          </div>
        </Field>

        <Field name="description" v-slot="{ field }">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea v-bind="field" rows="4" maxlength="90" class="w-full px-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="Optional"></textarea>
          </div>
        </Field>

        <!-- Status & Priority -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field name="status" v-slot="{ field, meta }">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status <span class="text-red-600">*</span></label>
              <select v-bind="field" class="w-full px-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" :class="meta.touched && !meta.valid ? 'border-red-500' : 'border-gray-300'">
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              <div v-if="meta.touched && !meta.valid" class="flex items-center gap-1 mt-2 text-red-600 text-sm">
                <AlertCircle class="w-4 h-4" />
                <ErrorMessage name="status" />
              </div>
            </div>
          </Field>

          <Field name="priority" v-slot="{ field }">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select v-bind="field" class="w-full px-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </Field>
        </div>

        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <button type="submit" :disabled="loading" class="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 active:bg-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            {{ loading ? (action === 'edit' ? "Updating..." : "Creating...") : (action === 'edit' ? "Update Ticket" : "Create Ticket") }}
          </button>
          <button type="button" @click="handleClose" :disabled="isSubmitting" class="w-full px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-all">
            Cancel
          </button>
        </div>

      </Form>
    </div>
  </div>
</template>


<!-- // onMounted(() => {
//     const fetchTicket = async ()=> {
//          if (action.value === 'edit' && id.value) {
//     const fetched = await getTicketbyId(id.value)
// console.log('it got heree!!!', fetched);

//     // assign plain object to avoid reactivity loops
//     // const fetched = ticket
//     // // assignedTicket.value = fetched
//     // formInitialValues.value = fetched
//     // isSubmitting.value = false
//   }
//     }
//     fetchTicket();
// }) -->