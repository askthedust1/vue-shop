<script setup lang="ts">
import type { Product } from '@/types';
import Card from './Card.vue'
import { useCart } from '@/stores/cart';

const { items } = defineProps<{
  items: Product[];
}>()

const store = useCart();
const { addToCart, addToFavorite } = store;
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
        v-for="item in items"
        :key="item._id"
        :_id="item._id"
        :title="item.title"
        :imageUrl="item.image"
        :price="item.price"
        :onClickAdd="() => addToCart(item)"
        :onClickFavorite="() => addToFavorite(item)"
    />
  </div>
</template>