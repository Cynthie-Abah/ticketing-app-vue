<script setup>
import { Eye, EyeClosed } from 'lucide-vue-next';
import { ref } from 'vue';

const viewPassword = ref(false);

const props = defineProps({
//   modelValue: String,
  placeholder: String,
  id: String,
  meta: Object 
});
// defineEmits(['update:modelValue']);
</script>

<template>
    <div class="relative">
        <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
        :id="props.id"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        :type="viewPassword ? 'text' : 'password'"
        :class="`w-full pl-10 pr-4 py-3 border ${props.meta && !props.meta.valid && props.meta.touched ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`"
        v-bind="$attrs"
        />
        <button @click="viewPassword = !viewPassword">
            <template v-if="viewPassword">
                <!-- <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5">open eye</span> -->
                <Eye class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"/>
            </template>
            <template v-else>
                <!-- <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5">closed eye</span> -->
                <EyeClosed class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            </template>
        </button>
    </div>
</template>