<template>
  <div class="max-w-5xl mx-auto p-8">
    <div v-if="product" class="bg-white rounded-xl shadow-xl p-8">
      <div class="flex flex-col lg:flex-row gap-8">
       
        <div class="w-full lg:w-1/2 flex justify-center items-center bg-white">
          <img
            :src="product.thumbnail"
            class="max-h-80 w-auto object-contain rounded"
            alt="Produto"
          />
        </div>

        
        <div class="flex-1">
          <h1 class="text-3xl font-bold mb-4">{{ product.title }}</h1>
          <p class="text-gray-700 text-lg mb-6">{{ product.description }}</p>
          <p class="text-sm text-purple-600 font-medium mb-2">Categoria: {{ product.category }}</p>
          <p class="text-2xl font-bold text-blue-800 mb-2">R$ {{ product.price }}</p>
          <p class="text-sm text-gray-500 mb-4">Estoque: {{ product.stock }}</p>

          
          <button
            @click="addToCart"
            class="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
          >
            Adicionar ao carrinho
          </button>

          
          <p v-if="feedback" class="text-green-600 mt-2">{{ feedback }}</p>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 mt-10">Carregando produto...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const product = ref(null)
const feedback = ref('')
const userId = 1

onMounted(async () => {
  try {
    const res = await axios.get(`https://dummyjson.com/products/${route.params.id}`)
    product.value = res.data
  } catch (error) {
    console.error('Erro ao carregar o produto:', error)
  }
})

const addToCart = async () => {
  try {
    await axios.post('https://dummyjson.com/carts/add', {
      userId,
      products: [
        {
          id: product.value.id,
          quantity: 1
        }
      ]
    })

    feedback.value = 'Produto adicionado ao carrinho com sucesso!'
  } catch (error) {
    feedback.value = 'Erro ao adicionar ao carrinho.'
    console.error('Erro ao adicionar ao carrinho:', error)
  }

  setTimeout(() => {
    feedback.value = ''
  }, 3000)
}
</script>
