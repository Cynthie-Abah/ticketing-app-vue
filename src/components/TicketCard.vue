<script setup>
defineProps({
    ticket: {
        type: Object
    },
    onDelete: {
        type: Function
    }
})
import { Edit2, Trash2 } from 'lucide-vue-next';
import { reactive } from 'vue';

    const statusColors = reactive({
    open: 'bg-green-100 text-green-800',
    in_progress: 'bg-amber-100 text-amber-800',
    closed: 'bg-gray-100 text-gray-800',
});

    const priorityColors = reactive({
    low: 'text-gray-600',
    medium: 'text-blue-600',
    high: 'text-red-600',
});
</script>

<template>
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
        <div class="flex items-start justify-between mb-4">
        <span :class="`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[statusColors[ticket.status]]}`" >
            {{ticket.status.replace('_', ' ').toUpperCase()}}
        </span>
        <div class="flex items-center gap-2">
            <RouterLink
            :to="`/dashboard/tickets?action=edit&id=${ticket.id}`"
            class="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Edit ticket"
            >
            <Edit2 class="w-4 h-4" />
            </RouterLink>
            <button
            @click="onDelete(ticket)"
            class="text-red-600 cursor-pointer hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete ticket"
            >
            <Trash2 class="w-4 h-4" />
            </button>
        </div>
        </div>

        <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{{ticket.title}}</h3>

        <p v-if="ticket.description" class="text-gray-600 text-sm mb-4 line-clamp-3">{{ticket.description}}</p>

        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
        <span :class="`text-sm font-medium ${priorityColors[ticket.priority]}`">
            {{ticket?.priority?.toUpperCase()}} Priority
        </span>
        <span class="text-xs text-gray-500">
            {{new Date(ticket.created_at).toLocaleDateString()}}
        </span>
        </div>
    </div>
</template>