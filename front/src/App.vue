<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderNav from './components/HeaderNav.vue';
import Drawer from './components/Drawer.vue';
import { useCart } from './stores/cart';
import { storeToRefs } from 'pinia';

const cart = useCart();
const { isOpen } = storeToRefs(cart);

</script>

<template>
  <Drawer v-if="isOpen" />
  <div class="container mx-auto p-4">
    <HeaderNav/>
    <RouterView />
  </div>
</template>

