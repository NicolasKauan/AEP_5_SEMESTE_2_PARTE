<script setup lang="ts">
const props = defineProps({ variant: { type: String, default: 'default' } })
</script>

<template>
  <span :class="[
    'px-2 py-1 rounded text-xs font-semibold inline-block',
    props.variant === 'baixa' ? 'bg-green-100 text-green-800' : '',
    props.variant === 'media' ? 'bg-yellow-100 text-yellow-800' : '',
    props.variant === 'alta' ? 'bg-orange-100 text-orange-800' : '',
    props.variant === 'urgente' ? 'bg-red-100 text-red-800' : ''
  ]">
    <slot />
  </span>
</template>
