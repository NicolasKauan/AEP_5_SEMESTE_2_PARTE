<script setup lang="ts">
import type { PropType } from 'vue'

type ModelValue = string | number

const props = defineProps({
  modelValue: { type: [String, Number] as PropType<ModelValue>, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String as PropType<'text' | 'email' | 'password' | 'number'>, default: 'text' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="text-sm font-semibold text-slate-700 px-1">
      {{ label }}
      <span v-if="required" class="text-emerald-600">*</span>
    </label>

    <div class="relative group">
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        @input="onInput"
        :class="[
          'w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition-all duration-200',
          'placeholder:text-slate-400',
          error
            ? 'border-red-300 bg-red-50/30 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
            : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 hover:border-slate-300'
        ]"
      />
    </div>

    <span v-if="error" class="text-xs font-medium text-red-500 px-1 animate-in fade-in slide-in-from-top-1">
      {{ error }}
    </span>
  </div>
</template>
