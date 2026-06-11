<script setup lang="ts">
defineProps({
  variant: { type: String, default: 'primary' },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
})
</script>

<template>
  <button
    :type="type"
    :class="[
      'px-4 py-2 rounded-md font-medium transition',
      variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : '',
      variant === 'ghost' ? 'bg-transparent text-gray-700' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
