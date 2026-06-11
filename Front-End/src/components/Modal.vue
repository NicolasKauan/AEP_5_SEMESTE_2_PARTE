<script setup lang="ts">
const props = defineProps({ show: Boolean })
const emit = defineEmits(['close'])
</script>

<template>
  <div v-if="props.show" class="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div class="bg-white rounded p-6 w-full max-w-md">
      <slot />
      <div class="mt-4 text-right">
        <button class="px-4 py-2 bg-gray-200 rounded" @click="$emit('close')">Fechar</button>
      </div>
    </div>
  </div>
</template>
