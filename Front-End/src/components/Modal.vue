<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  show: Boolean,
  maxWidth: { type: String, default: 'max-w-md' }
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}

// Bloqueia o scroll do body quando o modal está aberto
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.show) close()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="close"></div>

        <!-- Modal Content -->
        <Transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div 
            v-if="show"
            :class="[
              'relative w-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden',
              maxWidth
            ]"
          >
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
