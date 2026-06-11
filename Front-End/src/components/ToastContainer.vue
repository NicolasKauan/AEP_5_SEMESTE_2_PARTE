<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { subscribe, remove } from '@/services/toast'

type ToastItem = { id: number; type: 'success' | 'error' | 'info'; message: string }

const toasts = ref<ToastItem[]>([])
let unsub: (() => void) | null = null
onMounted(() => {
  unsub = subscribe((t: ToastItem[]) => {
    toasts.value = t
  })
})
onUnmounted(() => unsub?.())
</script>

<template>
  <div class="fixed top-4 right-4 z-50 flex w-80 flex-col gap-2">
    <div v-for="t in toasts" :key="t.id" :class="[
      'rounded-3xl border p-4 shadow-xl transition',
      t.type === 'success' ? 'bg-emerald-50 border-emerald-200' : '',
      t.type === 'error' ? 'bg-rose-50 border-rose-200' : '',
      t.type === 'info' ? 'bg-sky-50 border-sky-200' : ''
    ]">
      <div class="text-sm font-medium text-slate-900">{{ t.message }}</div>
      <div class="mt-2 text-xs text-slate-500 text-right cursor-pointer hover:text-slate-700" @click="remove(t.id)">Fechar</div>
    </div>
  </div>
</template>
