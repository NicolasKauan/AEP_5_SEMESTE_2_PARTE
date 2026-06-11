<script setup lang="ts">
import Button from '@/components/Button.vue'
</script>

<template>
  <div class="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-slate-50">
    <div class="w-full max-w-lg bg-white rounded-[2.5rem] p-10 sm:p-14 shadow-2xl shadow-slate-200/50 border border-slate-100 text-center relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-[60px] -mr-16 -mt-16"></div>
      
      <div class="relative z-10">
        <div class="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl rotate-3">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>

        <h2 class="text-3xl font-black text-slate-900 tracking-tight mb-4">Privacidade</h2>
        <p class="text-slate-500 text-lg leading-relaxed mb-10">
          Você pode realizar sua denúncia de forma totalmente <span class="text-emerald-600 font-bold">anônima</span> ou se identificar para acompanhar o protocolo em seu perfil.
        </p>

        <div class="flex flex-col gap-4">
          <Button @click="$router.push('/morador?anonimo=true')" class="h-16 text-lg">
            Denunciar Anonimamente
          </Button>
          <Button @click="$router.push('/login')" variant="outline" class="h-16 text-lg">
            Fazer Login / Identificar-me
          </Button>
        </div>

        <p class="mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
          Sua identidade é protegida em ambos os casos.
        </p>
      </div>
    </div>
  </div>
</template>
