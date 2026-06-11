<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  variant: { 
    type: String as PropType<'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'>, 
    default: 'primary' 
  },
  type: { 
    type: String as PropType<'button' | 'submit' | 'reset'>, 
    default: 'button' 
  },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  fullWidth: { type: Boolean, default: false }
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 active:scale-95 disabled:active:scale-100',
      fullWidth ? 'w-full' : '',

      variant === 'primary' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 hover:shadow-emerald-500/30' : '',     

      variant === 'secondary' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800' : '',

      variant === 'outline' ? 'bg-transparent border-2 border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-600' : '',        

      variant === 'ghost' ? 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900' : '',

      variant === 'danger' ? 'bg-red-50 text-red-600 hover:bg-red-100' : '',

      disabled || loading ? 'opacity-50 cursor-not-allowed grayscale-[0.5]' : ''
    ]"
  >
    <svg v-if="loading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <slot v-else />
  </button>
</template>
