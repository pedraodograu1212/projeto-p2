<script setup>
import { inject, computed } from 'vue';

const cart = inject('cart');
const updateQuantity = inject('updateQuantity');
const removeFromCart = inject('removeFromCart');

const total = computed(() =>
  cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
);
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold mb-4">Carrinho</h1>

    <div v-if="cart.length > 0" class="space-y-4">
      <div
        v-for="item in cart"
        :key="item.id"
        class="border p-4 rounded flex items-center gap-4"
      >
       
        <img
          :src="item.thumbnail"
          alt="Imagem do produto"
          class="w-20 h-20 object-cover rounded"
        />

        
        <div class="flex-1">
          <p class="font-semibold">{{ item.title }}</p>
          <p class="text-sm text-gray-600">
            R$ {{ item.price }} | Qtd: {{ item.quantity }}
          </p>
        </div>

       
        <div class="flex gap-2 items-center">
          <button
            @click="updateQuantity(item.id, item.quantity - 1)"
            class="px-2 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <button
            @click="updateQuantity(item.id, item.quantity + 1)"
            class="px-2 py-1 bg-gray-200 rounded"
          >
            +
          </button>
          <button
            @click="removeFromCart(item.id)"
            class="ml-2 px-3 py-1 bg-red-500 text-white rounded"
          >
            Remover
          </button>
        </div>
      </div>

      
      <div class="text-right mt-6 border-t pt-4">
        <p class="text-xl font-bold">Total: R$ {{ total.toFixed(2) }}</p>
      </div>
    </div>

    <p v-else class="text-gray-500">O carrinho está vazio.</p>
  </div>
</template>
