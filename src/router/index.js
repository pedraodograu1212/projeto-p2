import { createRouter, createWebHistory } from 'vue-router'

import ProductListView from '../views/ProductListView.vue'
import ProductDetailsView from '../views/ProductDetailsView.vue'
import CartView from '../views/CartView.vue'
import CategoryView from '../views/CategoryView.vue'

const routes = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductListView,
  },
  {
    path: '/produto/:id',
    name: 'ProductDetails',
    component: ProductDetailsView,
    props: true,
  },
  {
    path: '/carrinho',
    name: 'Carrinho',
    component: CartView,
  },
  {
    path: '/categoria/:name',
    name: 'category',
    component: () => import('@/views/CategoryView.vue') // ou o nome do seu view
  }
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
