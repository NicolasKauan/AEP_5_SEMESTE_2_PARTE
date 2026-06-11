<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  variant: { 
    type: String as PropType<'baixa' | 'media' | 'alta' | 'urgente' | 'default'>, 
    default: 'default' 
  }
})
</script>

<template>
  <span :class="[
    'px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border',
    variant === 'baixa' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : '',
    variant === 'media' ? 'bg-amber-50 text-amber-700 border-amber-200' : '',
    variant === 'alta' ? 'bg-orange-50 text-orange-700 border-orange-200' : '',
    variant === 'urgente' ? 'bg-red-50 text-red-700 border-red-200' : '',
    variant === 'default' ? 'bg-slate-100 text-slate-700 border-slate-200' : ''
  ]">
    <span :class="[
      'w-1.5 h-1.5 rounded-full',
      variant === 'baixa' ? 'bg-emerald-500' : '',
      variant === 'media' ? 'bg-amber-500' : '',
      variant === 'alta' ? 'bg-orange-500' : '',
      variant === 'urgente' ? 'bg-red-500' : '',
      variant === 'default' ? 'bg-slate-500' : ''
    ]"></span>
    <slot />
  </span>
</template>
