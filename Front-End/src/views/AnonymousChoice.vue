<script setup lang="ts">
import Button from '@/components/Button.vue'
</script>

<template>
  <div class="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-slate-50">
    <div class="w-full max-w-lg bg-white rounded-3xl p-10 sm:p-14 shadow-xl border border-slate-100 text-center relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-[60px] -mr-16 -mt-16"></div>
      
      <div class="relative z-10">
        <div class="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg rotate-3">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>

        <h2 class="text-3xl font-bold text-slate-900 tracking-tight mb-4">Privacidade</h2>
        <p class="text-slate-500 text-base leading-relaxed mb-10 px-4">
          Você pode realizar sua denúncia de forma totalmente <span class="text-emerald-600 font-bold">anônima</span> ou se identificar para acompanhar o protocolo em seu perfil.
        </p>

        <div class="flex flex-col gap-3">
          <Button @click="$router.push('/morador?anonimo=true')" class="h-14">
            Denunciar Anonimamente
          </Button>
          <Button @click="$router.push('/login')" variant="outline" class="h-14">
            Fazer Login / Identificar-me
          </Button>
        </div>

        <p class="mt-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          Sua identidade é protegida em ambos os casos.
        </p>
      </div>
    </div>
  </div>
</template>
