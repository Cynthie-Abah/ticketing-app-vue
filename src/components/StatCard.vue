<script setup>
defineProps({
    bgColor: {
        type: String,
    },
    borderColor: {
        type: String,
    },
    icon: {
        type: Object,
    },
    title: {
        type: String,
    },
    value: {
        type: [String, Number],
    },
    color: {
        type: String,
    },
})
</script>

<template>
    <div :class="`${bgColor} border ${borderColor} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`">
      <div class="flex items-center gap-4">
        <component :is="icon" :class="`w-8 h-8 ${color}`"/>
        <div>
          <p class="text-sm font-medium text-gray-600">{{title}}</p>
          <p class="text-3xl font-bold text-gray-900 mt-1">{{value}}</p>
        </div>
      </div>
    </div>
</template>