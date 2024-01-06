import { defineStore } from 'pinia'
import type { RegisterResponse, User, UserLogin, UserRegister } from '@/types'
import axiosApi from '@/axiosApi'

interface UserState {
  user: User | null
}

export const useUser = defineStore({
  id: 'user',
  state: (): UserState => ({
    user: null
  }),
  persist: true,
  getters: {},
  actions: {
    async login(data: UserLogin): Promise<void> {
      const response = await axiosApi.post<RegisterResponse>('/users/sessions', data)
      this.user = response.data.user
    },
    async register(data: UserRegister): Promise<void> {
      const response = await axiosApi.post<RegisterResponse>('/users', data)
      this.user = response.data.user
    },
    unsetUser() {
      this.user = null
    }
  }
})
