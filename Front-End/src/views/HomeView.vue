<script setup lang="ts">
import Button from '@/components/Button.vue'
</script>

<template>
  <div class="home">

    <section class="banner">
      <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80"
        alt="Cidade limpa" />

      <div class="banner-texto">
        <h1>Bem-vindo ao Eco Coleta</h1>

        <p>
          Sua plataforma para um ambiente mais limpo e sustentável.
          Junte-se a nós na luta contra o descarte irregular de lixo.
        </p>

        <div class="botoes">
          <Button @click="$router.push('/login')">
            Login
          </Button>

          <Button @click="$router.push('/denunciar-anonimo')">
            Denunciar Lixo
          </Button>
        </div>
      </div>
    </section>

    <section class="informacoes">

      <div class="card">
        <h2>Moradores</h2>
        <p>
          Registre ocorrências e acompanhe seus protocolos.
        </p>
      </div>

      <div class="card">
        <h2>Prestadores</h2>
        <p>
          Gerencie e conclua solicitações de coleta.
        </p>
      </div>

      <div class="card">
        <h2>Ecologistas</h2>
        <p>
          Monitore pontos críticos e acompanhe indicadores ambientais.
        </p>
      </div>

    </section>

  </div>
</template>

<style scoped>
@import './HomeStyle.css';
</style>
