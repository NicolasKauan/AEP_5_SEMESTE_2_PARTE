<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { subscribe, remove } from '@/services/toast'

const toasts = ref([])
let unsub: any
onMounted(() => {
  unsub = subscribe((t: any[]) => (toasts.value = t))
})
onUnmounted(() => unsub && unsub())
</script>

<template>
  <div class="fixed top-4 right-4 w-80 z-50 flex flex-col gap-2">
    <div v-for="t in toasts" :key="t.id" :class="['p-3 rounded shadow', t.type==='success'?'bg-green-50 border border-green-200':'', t.type==='error'?'bg-red-50 border border-red-200':'', t.type==='info'?'bg-blue-50 border border-blue-200':'']">
      <div class="text-sm">
        {{ t.message }}
      </div>
      <div class="text-xs text-gray-500 mt-1 cursor-pointer text-right" @click="remove(t.id)">Fechar</div>
    </div>
  </div>
</template>

<script lang="ts">
import { remove } from '@/services/toast'
</script>
