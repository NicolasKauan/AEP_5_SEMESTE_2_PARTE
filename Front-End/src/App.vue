<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import ToastContainer from '@/components/ToastContainer.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <Navbar />
    <main>
      <RouterView />
    </main>
    <ToastContainer />
  </div>
</template>

<style>
/* keep minimal fallback styles in case Tailwind isn't installed */
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body, #app { min-height: 100%; }
body {
  font-family: Inter, Arial, sans-serif;
  background: #f8fafc;
  color: #0f172a;
}
</style>
