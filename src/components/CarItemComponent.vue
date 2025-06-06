
<script setup>
defineProps(['item'])
const emit = defineEmits(['update-quantity', 'remove'])
</script>

<template>
  <div class="border p-4 rounded flex items-center gap-4">
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
        @click="emit('update-quantity', item.id, item.quantity - 1)"
        class="px-2 py-1 bg-gray-200 rounded"
      >
        -
      </button>
      <button
        @click="emit('update-quantity', item.id, item.quantity + 1)"
        class="px-2 py-1 bg-gray-200 rounded"
      >
        +
      </button>
      <button
        @click="emit('remove', item.id)"
        class="ml-2 px-3 py-1 bg-red-500 text-white rounded"
      >
        Remover
      </button>
    </div>
  </div>
</template>
