import { defineStore } from 'pinia'
import type { Product } from "@/types";
import axiosApi from '@/axiosApi';

interface ProductState {
  products: Product[];
  loadingProducts: Boolean;
  product: Product | null;
  loadingProduct: Boolean;
}

export const useProducts = defineStore({
  id: 'products',
  state: (): ProductState => ({
    products: [],
    loadingProducts: false,
    product: null,
    loadingProduct: false,
  }),
  getters: {},
  actions: {
    async fetchProducts(): Promise<void> {
      try {
        this.loadingProducts = true;
        const response = await axiosApi.get<Product[]>('/products')
        this.products = response.data
      } catch (e) {
        console.log(e);
      } finally {
        this.loadingProducts = false;
      }
    },
    async fetchSingleProduct(id: string | string[]) {
      try {
        this.loadingProduct = true;
        const response = await axiosApi.get<Product>(`/products/${id}`)
        this.product = response.data
      } catch (e) {
        console.log(e);
      } finally {
        this.loadingProduct = false;
      }
    }
  }
})