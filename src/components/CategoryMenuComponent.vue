<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const categories = ref([])
const showCategories = ref(false)
const loadingCategories = ref(false)

const router = useRouter()

const fetchCategories = async () => {
  loadingCategories.value = true
  try {
    const response = await fetch('https://dummyjson.com/products/category-list')
    if (!response.ok) throw new Error('Erro ao buscar categorias')
    categories.value = await response.json()
  } catch (error) {
    console.error("Erro ao buscar categorias:", error)
    categories.value = []
  } finally {
    loadingCategories.value = false
  }
}

const toggleCategories = () => {
  showCategories.value = !showCategories.value
}

const goToCategory = (category) => {
  showCategories.value = false
  router.push({ name: 'category', params: { name: category } })
}

const formatCategory = (cat) => {
  return cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

onMounted(fetchCategories)
</script>

<template>
  <aside class="relative mb-4">
    <button
      @click="toggleCategories"
      class="flex items-center justify-center p-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>

    <div
      v-if="showCategories"
      class="absolute top-10 left-0 bg-white shadow p-2 rounded-md z-10 max-h-96 overflow-auto min-w-[180px]"
    >
      <p v-if="loadingCategories" class="text-sm text-gray-500">Carregando categorias...</p>
      <ul v-else-if="categories.length > 0" class="space-y-1">
        <li
          v-for="category in categories"
          :key="category"
          @click="goToCategory(category)"
          class="cursor-pointer hover:text-purple-700 text-sm transition whitespace-nowrap"
        >
          {{ formatCategory(category) }}
        </li>
      </ul>
      <p v-else class="text-sm text-gray-500">Nenhuma categoria encontrada.</p>
    </div>
  </aside>
</template>
