<script setup>
import { ref, provide } from 'vue'
import Navbar from './components/NavbarComponent.vue'
import Footer from './components/FooterComponent.vue'

const cart = ref([])
const searchTerm = ref('')


const addToCart = (product) => {
  const existing = cart.value.find(p => p.id === product.id)
  if (existing) {
    existing.quantity += 1
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}


const removeFromCart = (productId) => {
  cart.value = cart.value.filter(p => p.id !== productId)
}


const setSearchTerm = (term) => {
  searchTerm.value = term
}


provide('cart', cart)
provide('addToCart', addToCart)
provide('removeFromCart', removeFromCart)
provide('searchTerm', searchTerm)
provide('setSearchTerm', setSearchTerm)
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    
    <Navbar />


    <main class="container mx-auto px-4 py-6 flex-grow">
      <router-view />
    </main>

    
    <Footer />
  </div>
</template>
