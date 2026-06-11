<script setup lang="ts">
const props = defineProps({ modelValue: [String, Number], label: String, type: { type: String, default: 'text' } })
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="block">
    <div v-if="props.label" class="text-sm text-gray-600 mb-1">{{ props.label }}</div>
    <input
      :type="props.type"
      class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
      :value="props.modelValue"
      @input="e => emit('update:modelValue', e.target.value)"
    />
  </label>
</template>
