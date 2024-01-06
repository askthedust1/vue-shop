<script setup lang="ts">
import { useProducts } from '@/stores/products';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductDetails from "@/components/ProductDetails.vue";
import Spinner from '../components/Spinner.vue'


const store = useProducts();
const route = useRoute();
const { product, loadingProduct } = storeToRefs(store);
const { fetchSingleProduct } = useProducts();

onMounted(async () => {
    try {
      await fetchSingleProduct(route.params.id)
    } catch (error) {
      console.log(error);
    }
})

</script>

<template>
  <div class="d-flex justify-content-center align-items-center mt-5" v-if="loadingProduct">
    <Spinner />
  </div>
  <div v-else-if="!loadingProduct && product">
    <ProductDetails :product="product" />
  </div>
</template>