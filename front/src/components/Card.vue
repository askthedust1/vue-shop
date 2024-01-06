<script setup lang="ts">
import { apiUrl } from '@/constants';
import { useCart } from '@/stores/cart';
import { ref, type PropType, computed } from 'vue';

const { _id, title, imageUrl, price, onClickAdd } = defineProps({
  _id: String,
  title: String,
  imageUrl: String,
  price: Number,
  onClickAdd: Function as PropType<() => void>,
  onClickFavorite: Function as PropType<() => void>
});

const showButton = ref(false);
const store = useCart();
const isInCart = computed(() => store.cart.some((unit) => _id === unit.product._id));
const isInFav = computed(() => store.favorite.some((unit) => _id === unit._id));
</script>

<template>
  <div
      class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      alt="Like 1"
      :src="!isInFav ? '/like-1.svg' : '/like-2.svg'"
      class="absolute top-8 left-8 z-10"
      @click="onClickFavorite"
    />
    <div
      @mouseenter="showButton = true"
      @mouseleave="showButton = false"
      class="relative"
    >
      <img :src="apiUrl + '/' + imageUrl" alt="Sneaker" class="z-30" />
      <button
        v-if="showButton"
        @click="$router.push(`/products/${_id}`)"
        class="absolute inset-0 m-auto h-10 px-4 bg-red-700 text-white rounded-full opacity-90 hover:opacity-100 transition duration-300"
        style="width: max-content;"
      >
        Подробнее
      </button>
    </div>

    <p class="mt-2">{{ title }}</p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{ price }} 	&#36;</b>
      </div>
      <img
        @click="onClickAdd"
        :src="!isInCart ? '/plus.svg' : '/checked.svg'"
        alt="Plus"
      />
    </div>
  </div>
</template>