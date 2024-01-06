<script setup lang="ts">
import {useProducts} from "@/stores/products";
import {storeToRefs} from "pinia";
import CardList from "@/components/CardList.vue";
import { onMounted } from "vue";
import Spinner from '../components/Spinner.vue'

const store = useProducts();
const { products, loadingProducts } = storeToRefs(store);
const { fetchProducts } = useProducts();

onMounted(async () => {
  await fetchProducts();
});

</script>

<template>
  <div v-if="loadingProducts">
    <Spinner />
  </div>

  <div v-else-if="!loadingProducts && products.length > 0" class="mt-10">
    <CardList :items="products" />
  </div>
</template>