<script setup lang="ts">
import { useCart } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import CardList from "@/components/CardList.vue";

const store = useCart();
const { favorite } = storeToRefs(store);

</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Избранное</h2>

  <CardList :items="favorite" />
</template>