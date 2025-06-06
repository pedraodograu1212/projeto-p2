<script setup>
import { ref, inject, watch } from 'vue'
import loja_virtual from '@/assets/loja_virtual.png'

const searchTerm = ref('')
const setSearchTerm = inject('setSearchTerm')


watch(searchTerm, (newVal) => {
  if (setSearchTerm) setSearchTerm(newVal)
})


function handleSearchClick() {
  if (setSearchTerm) setSearchTerm(searchTerm.value)
}
</script>

<template>

  <nav class="bg-gray-800 text-white px-8 py-3 flex items-center">
   
    <div class="flex items-center flex-shrink-0">
      <img :src="loja_virtual" alt="Logo da Marca" class="h-10 w-auto" />
    </div>

    
    <div class="flex-1 flex justify-center">
      <div class="relative w-full max-w-lg">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Busque seu produto..."
          class="w-full bg-white text-gray-800 placeholder-gray-400 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none"
        />
        <button
          type="button"
          aria-label="Buscar"
          @click="handleSearchClick"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg"
               class="h-5 w-5"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </div>

  
    <div class="flex items-center space-x-6 flex-shrink-0">
     
      <button aria-label="Account" class="hover:text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg"
             class="h-6 w-6"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>

      
      <button aria-label="Wishlist" class="hover:text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg"
             class="h-6 w-6"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round">
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.78 0L12 5.6l-1.02-1.02a5.5 5.5 0 0 0-7.78 7.78l1.02 1.02L12 21.23l7.78-7.78 1.02-1.02a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>

      
      <router-link to="/carrinho" aria-label="Cart" class="hover:text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg"
             class="h-6 w-6"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </router-link>
    </div>
  </nav>
</template>
