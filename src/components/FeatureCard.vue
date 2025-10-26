<template>
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
    <div className="mb-4"><component :is="icon" :class="`w-8 h-8 ${color}`" /></div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{{title}}</h3>
    <p className="text-gray-600 leading-relaxed">{{description}}</p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    icon: {
        type: Object,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    color: {
      type: String,
    }
})
</script>