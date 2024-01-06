<script setup lang="ts">
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import { useCart } from '@/stores/cart';
import { storeToRefs } from 'pinia';

defineProps({
  isOpen: Boolean
})

const cart = useCart();
const { total } = storeToRefs(cart);

</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-20 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <div>
      <CartItemList />

      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ total }}  &#36;</b>
        </div>

        <button
          class="mt-4 transition bg-red-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-red-600 active:bg-red-700 cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>