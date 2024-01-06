<script setup lang="ts">
import { useCart } from '@/stores/cart';
import { useUser } from '@/stores/users';
import { storeToRefs } from 'pinia';

const store = useUser();
const { user } = storeToRefs(store);
const { unsetUser } = store;

const cart = useCart();
const { total } = storeToRefs(cart);
const { handleDrawer } = cart;

const logoutUser = () => {
  unsetUser();
};
</script>

<template>
  <header class="flex justify-between px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-20" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue e-commerce</h2>
          <p class="text-slate-400">Магазин кроссовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-10">
      <li
        @click="handleDrawer"
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ total }} &#36;</b>
      </li>

      <router-link to="/favorites">
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="Cart" />
          <span>Избранное</span>
        </li>
      </router-link>

      <div @click="logoutUser" v-if="user">
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <img src="/profile.svg" alt="Profile" />
          <span>Выход</span>
        </li>
      </div>

      <router-link v-else to="/login">
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <img src="/profile.svg" alt="Cart" />
          <span>Профиль</span>
        </li>
      </router-link>
      
    </ul>
  </header>
</template>