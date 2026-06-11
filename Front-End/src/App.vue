<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import ToastContainer from '@/components/ToastContainer.vue'
</script>

<template>
  <div>
    <Navbar />
    <div class="container mx-auto mt-6">
      <RouterView />
    </div>
    <ToastContainer />
  </div>
</template>

<style>
/* keep minimal fallback styles in case Tailwind isn't installed */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: Inter, Arial, sans-serif; }
</style>
