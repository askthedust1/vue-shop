<script setup lang="ts">
import type { Product } from '@/types';
import { apiUrl } from '@/constants';
import { useCart } from '@/stores/cart';
import { computed } from 'vue';

const { product } = defineProps<{
  product: Product | null;
}>()

const store = useCart();
const { addToCart, addToFavorite } = store;
const isInCart = computed(() => store.cart.some((unit) => product?._id === unit.product._id));
const isInFav = computed(() => store.favorite.some((unit) => product?._id === unit._id));

</script>

<template>
    <section class="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
        <div class="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div class="flex flex-wrap -mx-4 items-center">
                <div class="w-full px-4 md:w-1/2 ">
                    <div class="sticky top-0 z-10 overflow-hidden ">
                        <div class="relative mb-6 lg:mb-10 lg:h-2/4 ">
                            <img :src="apiUrl + '/' + product?.image" :alt="product?.title"
                                class="object-cover w-full lg:h-full ">
                        </div>
                    </div>
                </div>
                <div class="w-full px-4 md:w-1/2 ">
                    <div class="lg:pl-20">
                        <div class="mb-8 ">
                            <span class="text-lg font-medium text-rose-500 dark:text-rose-200">{{ product?.category.title }}</span>
                            <h2 class="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                                {{ product?.title }}</h2>
                            <p class="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                                {{ product?.description }}
                            </p>
                            <p class="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                                <span>{{ product?.price }} &#36;</span>
                            </p>
                        </div>
                        <div class="flex flex-wrap items-center -mx-4 ">
                            <div class="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                                <button
                                    @click="product ? addToCart(product) : null"
                                    class="flex items-center justify-center w-full p-4 text-red-500 border border-red-500 rounded-md dark:text-gray-200 dark:border-red-600 hover:bg-red-600 hover:border-red-600 hover:text-gray-100 dark:bg-red-600 dark:hover:bg-red-700 dark:hover:border-red-700 dark:hover:text-gray-300">
                                    {{ isInCart ? 'В корзине' : 'Добавить в корзину' }}
                                </button>
                            </div>
                            <div class="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                                <button
                                    @click="product ? addToFavorite(product) : null"
                                    class="flex items-center justify-center w-full p-4 text-red-500 border border-red-500 rounded-md dark:text-gray-200 dark:border-red-600 hover:bg-red-600 hover:border-red-600 hover:text-gray-100 dark:bg-red-600 dark:hover:bg-red-700 dark:hover:border-red-700 dark:hover:text-gray-300">
                                    {{ isInFav ? 'В избранном' : 'Добавить в избанное' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>