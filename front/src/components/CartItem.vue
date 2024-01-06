<script setup lang="ts">
import { apiUrl } from '@/constants';
import type { PropType } from 'vue';

defineProps({
  _id: String,
  title: String,
  imageUrl: String,
  price: Number,
  onClickRemove: Function as PropType<() => void>
})
</script>

<template>
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="apiUrl + '/' + imageUrl" :alt="title" />

    <div class="flex flex-col flex-1">
      <p>{{ title }}</p>

      <div class="flex justify-between mt-2">
        <b class="flex-1">{{ price }}  &#36;</b>
        <img
          @click="onClickRemove"
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
        />
      </div>
    </div>
  </div>
</template>