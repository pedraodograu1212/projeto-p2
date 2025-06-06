<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ProductCard from '../components/ProductCardComponent.vue'

const route = useRoute()
const products = ref([])
const loading = ref(true)

const fetchCategoryProducts = async (category) => {
  loading.value = true
  try {
    const res = await axios.get(`https://dummyjson.com/products/category/${category}`)
    products.value = res.data.products
  } catch (err) {
    console.error("Erro ao buscar produtos da categoria:", err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCategoryProducts(route.params.name)
})

watch(() => route.params.name, (newCat) => {
  fetchCategoryProducts(newCat)
})
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold mb-4 capitalize">
      Categoria: {{ route.params.name.replace('-', ' ') }}
    </h1>

    <div v-if="loading" class="text-gray-500">Carregando produtos...</div>

    <div v-else-if="products.length === 0" class="text-gray-500">Nenhum produto encontrado.</div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="{
          id: product.id,
          name: product.title,
          image: product.thumbnail,
          category: product.category,
          price: product.price,
          stock: product.stock
        }"
      />
    </div>
  </div>
</template>
