<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Painel do Morador</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <BuscarProtocoloView />
      </div>
      <div>
        <RegistrarChamadoView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BuscarProtocoloView from './BuscarProtocoloView.vue'
import RegistrarChamadoView from './RegistrarChamadoView.vue'
</script>
