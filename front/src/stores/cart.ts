import { defineStore } from 'pinia'
import type { CartItem } from '../types'
import type { Product } from '../types'

interface CartState {
  cart: CartItem[]
  favorite: Product[],
  total: number
  isOpen: boolean
}

export const useCart = defineStore({
  id: 'cart',
  state: (): CartState => ({
    cart: [],
    favorite: [],
    total: 0,
    isOpen: false
  }),
  persist: true,
  getters: {},
  actions: {
    addToCart(product: Product) {
      const existingIndex = this.cart.findIndex((cartItem) => cartItem.product._id === product._id)

      if (existingIndex === -1) this.cart.push({ product });
      this.countTotal();
    },
    addToFavorite(product: Product) {
      const existingIndex = this.favorite.findIndex((item) => item._id === product._id);

      if (existingIndex === -1) this.favorite.push(product);
    },
    removeFromCart(id: string) {
      const existingIndex = this.cart.findIndex((cartItem) => cartItem.product._id === id);

      this.cart.splice(existingIndex, 1);
      this.countTotal();
    },
    handleDrawer() {
      this.isOpen = !this.isOpen;
    },
    countTotal() {
      this.total = this.cart.reduce((accumulator, cartItem) => {
        return accumulator + cartItem.product.price
      }, 0);
    }
  }
})
