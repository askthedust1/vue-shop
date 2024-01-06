<script setup lang="ts">
import CartItem from './CartItem.vue'
import { useCart } from '@/stores/cart';
import { storeToRefs } from 'pinia';

const store = useCart();
const { cart } = storeToRefs(store);
const { removeFromCart } = store;
</script>

<template>
  <div class="flex flex-col flex-1 gap-4 justify-between">
    <CartItem
      v-for="item in cart"
      :key="item.product._id"
      :title="item.product.title"
      :price="item.product.price"
      :image-url="item.product.image"
      :onClickRemove="() => removeFromCart(item.product._id)"
    />
  </div>
</template>