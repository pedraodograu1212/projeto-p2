<script setup>
import fundo from '@/assets/fundo.jpg'
</script>

<template>
  <div
    class="w-full min-h-screen bg-cover bg-center"
    :style="{ backgroundImage: `url(${fundo})` }"
  >
  
    <div class="flex items-center justify-center h-full">
      <h1 class="text-white text-4xl font-bold">Bem-vindo à Loja</h1>
    </div>
  </div>
</template>
