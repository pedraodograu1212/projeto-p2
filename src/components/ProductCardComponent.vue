<script setup>
defineProps(['product'])
</script>

<template>
  <div class="border rounded-lg p-4 flex flex-col items-center hover:shadow-md transition">
    <router-link :to="`/produto/${product.id}`">
      <img :src="product.image" class="w-full h-40 object-cover mb-2 rounded" />
    </router-link>
    <h2 class="font-semibold text-center mb-1">{{ product.name }}</h2>
    <p class="text-sm text-gray-500 mb-2 capitalize">{{ product.category }}</p>

    
    <div class="w-3/4 border-t border-gray-200 my-2"></div>

    <p class="text-lg font-bold text-purple-700">R$ {{ product.price }}</p>
  </div>
</template>
