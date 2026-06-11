<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded shadow text-center max-w-lg">
      <h2 class="text-xl font-semibold mb-4">Gostaria de realizar a denúncia de maneira anônima?</h2>
      <div class="space-x-4">
        <RouterLink to="/morador?anonimo=true" class="px-4 py-2 bg-green-600 text-white rounded">Sim, quero ser anônimo</RouterLink>
        <RouterLink to="/login" class="px-4 py-2 bg-gray-200 rounded">Não, me identificar</RouterLink>
      </div>
    </div>
  </div>
</template>
