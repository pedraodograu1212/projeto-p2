<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])
const sortOption = ref('price-asc')
const loading = ref(false)

const fetchAllProducts = async () => {
  loading.value = true
  try {
    
    const firstResponse = await axios.get('https://dummyjson.com/products?limit=1')
    const total = firstResponse.data.total

    const limit = 100
    const pages = Math.ceil(total / limit)
    const allProducts = []

    for (let i = 0; i < pages; i++) {
      const skip = i * limit
      const res = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      allProducts.push(...res.data.products)
    }

    products.value = allProducts.map(p => ({
      id: p.id,
      name: p.title,
      price: p.price
    }))
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchAllProducts)

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
</script>

<template>
  <div style="max-width: 600px; margin: auto; padding: 1rem; font-family: Arial, sans-serif;">
    <h1 style="text-align:center; margin-bottom: 1rem;">Todos os Produtos</h1>

    <div style="margin-bottom: 1rem; text-align: center;">
      <label for="ordenar" style="font-weight: bold;">Ordenar por:</label><br />
      <select
        id="ordenar"
        v-model="sortOption"
        style="margin-top: 0.5rem; padding: 0.5rem; width: 100%; max-width: 250px; border-radius: 4px; border: 1px solid #ccc;"
      >
        <option value="price-asc">Preço Crescente</option>
        <option value="price-desc">Preço Decrescente</option>
        <option value="name-asc">Nome A - Z</option>
        <option value="name-desc">Nome Z - A</option>
      </select>
    </div>

    <p v-if="loading" style="text-align: center; color: gray;">Carregando produtos...</p>

    <ul v-else style="list-style: none; padding: 0;">
      <li
        v-for="product in sortedProducts"
        :key="product.id"
        style="display: flex; justify-content: space-between; padding: 0.75rem; border-bottom: 1px solid #ddd;"
      >
        <span>{{ product.name }}</span>
        <span style="font-weight: bold; color: #7c3aed;">R$ {{ product.price.toFixed(2) }}</span>
      </li>
    </ul>
  </div>
</template>
