<script setup lang="ts">
import Button from '@/components/Button.vue'
</script>

<template>
  <div class="bg-slate-50 min-h-screen">
    <!-- Hero Section -->
    <section class="relative pt-20 pb-32 overflow-hidden">
      <div class="container mx-auto px-4 relative z-10">
        <div class="flex flex-col lg:flex-row items-center gap-16">
          <div class="flex-1 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Zeladoria Urbana Digital
            </div>

            <h1 class="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8 animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
              Sua cidade <br />
              <span class="text-emerald-600">mais limpa</span> <br />
              com um clique.
            </h1>

            <p class="text-lg text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
              Conectamos moradores, prestadores e ecologistas em uma plataforma única para transformar a gestão de resíduos e zeladoria urbana.      
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <Button @click="$router.push('/login')" size="lg" class="px-10 h-16 text-lg">
                Começar Agora
              </Button>
              <Button @click="$router.push('/denunciar-anonimo')" variant="outline" size="lg" class="px-10 h-16 text-lg">
                Denúncia Anônima
              </Button>
            </div>

            <div class="mt-12 flex items-center justify-center lg:justify-start gap-8 animate-in fade-in duration-1000 delay-500">
              <div class="flex -space-x-4">
                <img v-for="i in 4" :key="i" :src="`https://i.pravatar.cc/100?u=${i}`" class="w-12 h-12 rounded-full border-4 border-slate-50 object-cover" />
              </div>
              <p class="text-sm font-semibold text-slate-500">
                <span class="text-slate-900 font-bold">+500 moradores</span> já participam
              </p>
            </div>
          </div>

          <div class="flex-1 relative animate-in fade-in slide-in-from-right-4 duration-1000">
            <div class="absolute inset-0 bg-emerald-200 blur-[120px] opacity-30 rounded-full"></div>
            <div class="relative bg-white p-4 rounded-[3rem] shadow-2xl border border-slate-100 rotate-2 hover:rotate-0 transition-transform duration-500 group">
               <div class="overflow-hidden rounded-[2.5rem]">
                 <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1000" alt="Cidade limpa" class="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110" />
               </div>

               <!-- Floating Stats -->
               <div class="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 animate-bounce-slow">
                 <p class="text-4xl font-black text-emerald-600">320+</p>
                 <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Protocolos Resolvidos</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Decoration -->
      <div class="absolute top-0 right-0 w-1/3 h-full bg-emerald-50 -z-10 rounded-l-[100px]"></div>
    </section>

    <!-- Features Section -->
    <section class="py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-20">
          <h2 class="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">Como Funciona</h2>
          <h3 class="text-4xl font-bold text-slate-900">Três perfis, um único objetivo: <br /> <span class="text-emerald-500">uma cidade melhor.</span></h3>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-emerald-600/5 hover:-translate-y-2">
            <div class="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </div>
            <h4 class="text-2xl font-bold text-slate-900 mb-4">Moradores</h4>
            <p class="text-slate-500 leading-relaxed">Registre descartes irregulares em segundos, acompanhe o protocolo e receba atualizações em tempo real.</p>
          </div>

          <!-- Card 2 -->
          <div class="group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-emerald-600/5 hover:-translate-y-2">
            <div class="w-16 h-16 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-8 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <h4 class="text-2xl font-bold text-slate-900 mb-4">Prestadores</h4>
            <p class="text-slate-500 leading-relaxed">Gerencie solicitações de coleta, otimize rotas e registre a conclusão dos serviços com transparência.</p>
          </div>

          <!-- Card 3 -->
          <div class="group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-emerald-600/5 hover:-translate-y-2">
            <div class="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-8 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21l-8-4.5v-9L12 3l8 4.5v9L12 21z"></path></svg>
            </div>
            <h4 class="text-2xl font-bold text-slate-900 mb-4">Ecologistas</h4>
            <p class="text-slate-500 leading-relaxed">Monitore os pontos críticos da cidade, analise dados ambientais e valide a eficiência das coletas.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact CTA -->
    <section class="py-24">
      <div class="container mx-auto px-4">
        <div class="bg-slate-900 rounded-[3rem] p-12 lg:p-24 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-full h-full opacity-20">
             <div class="absolute -top-24 -right-24 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[150px]"></div>
          </div>

          <div class="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 class="text-4xl lg:text-6xl font-black text-white leading-tight mb-8">
                Pronto para fazer <br />
                <span class="text-emerald-400 italic">a sua parte?</span>
              </h2>
              <p class="text-slate-400 text-lg mb-10 leading-relaxed">
                Junte-se a nós e ajude a transformar a zeladoria urbana em uma experiência transparente e eficiente para todos os cidadãos.
              </p>
              <Button @click="$router.push('/cadastro')" class="h-16 px-12 text-lg">
                Cadastrar Agora
              </Button>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div class="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                <p class="text-4xl font-black text-emerald-400">100%</p>
                <p class="text-sm text-slate-400 mt-2">Transparência</p>
              </div>
              <div class="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                <p class="text-4xl font-black text-emerald-400">24/7</p>
                <p class="text-sm text-slate-400 mt-2">Monitoramento</p>
              </div>
              <div class="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                <p class="text-4xl font-black text-emerald-400">Eco</p>
                <p class="text-sm text-slate-400 mt-2">Sustentável</p>
              </div>
              <div class="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                <p class="text-4xl font-black text-emerald-400">Easy</p>
                <p class="text-sm text-slate-400 mt-2">Acessibilidade</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes bounce-slow {
  0%, 100% { transform: translateY(-5%); }
  50% { transform: translateY(0); }
}
.animate-bounce-slow {
  animation: bounce-slow 3s infinite ease-in-out;
}
</style>
