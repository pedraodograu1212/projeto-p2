<script setup>
import { ref, watch, onMounted, inject, computed } from 'vue'
import axios from 'axios'
import ProductCard from '../components/ProductCardComponent.vue'
import CategoryMenu from '../components/CategoryMenuComponent.vue'

const searchTerm = inject('searchTerm')

const products = ref([])
const skip = ref(0)
const limit = 15
const selectedCategory = ref(null)
const sortOption = ref('price-asc')

const fetchProducts = async () => {
  let url = ''
  try {
    if (searchTerm.value?.trim()) {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm.value)}`
    } else if (selectedCategory.value) {
      url = `https://dummyjson.com/products/category/${selectedCategory.value}?limit=${limit}&skip=${skip.value}`
    } else {
      url = `https://dummyjson.com/products?limit=${limit}&skip=${skip.value}`
    }

    const response = await axios.get(url)
    const result = response.data.products || []
    products.value = result.map(p => ({
      id: p.id,
      name: p.title,
      image: p.thumbnail,
      category: p.category,
      price: p.price,
      stock: p.stock
    }))
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    products.value = []
  }
}

const sortedProducts = computed(() => {
  const list = [...products.value]
  switch (sortOption.value) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price)
    case 'name-asc':
      return list.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return list.sort((a, b) => b.name.localeCompare(a.name))
    default:
      return list
  }
})

const setSort = (option) => {
  sortOption.value = option
}

const nextPage = () => {
  skip.value += limit
  fetchProducts()
}

const prevPage = () => {
  if (skip.value >= limit) {
    skip.value -= limit
    fetchProducts()
  }
}

const onCategorySelect = (category) => {
  selectedCategory.value = category
  skip.value = 0
  fetchProducts()
}

onMounted(fetchProducts)

watch(searchTerm, () => {
  selectedCategory.value = null
  skip.value = 0
  fetchProducts()
})
</script>

<template>
  <div class="flex flex-col md:flex-row gap-6">
   
    <CategoryMenu @select="onCategorySelect" />


    <div class="flex-1">
   
      <div class="mb-4 flex flex-wrap gap-2 justify-center md:justify-start">
        <button
          v-for="option in ['price-asc', 'price-desc', 'name-asc', 'name-desc']"
          :key="option"
          :class="[
            'px-3 py-1 rounded bg-gray-300 hover:bg-gray-400',
            { 'bg-indigo-600 text-white': sortOption === option }
          ]"
          @click="setSort(option)"
        >
          {{
            option === 'price-asc' ? 'Preço ↑' :
            option === 'price-desc' ? 'Preço ↓' :
            option === 'name-asc' ? 'Nome A-Z' : 'Nome Z-A'
          }}
        </button>
      </div>

      <div v-if="products.length === 0" class="text-center text-gray-500 mt-6">
        Nenhum produto encontrado.
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="p in sortedProducts"
          :key="p.id"
          class="border rounded-lg p-2 shadow hover:shadow-lg transition bg-white"
        >
          <ProductCard :product="p" />
        </div>
      </div>

     
      <div v-if="!searchTerm.value" class="flex justify-center gap-4 mt-6">
        <button
          class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
          @click="prevPage"
          :disabled="skip === 0"
        >
          Anterior
        </button>
        <button
          class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          @click="nextPage"
        >
          Próximo
        </button>
      </div>
    </div>
  </div>
</template>
