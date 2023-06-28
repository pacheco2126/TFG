import { useAuthStore } from '../stores/auth'

// 1st access our store
// then call attempt() of store
//
export const authentication = {
  async install(){
    const store = useAuthStore()
    try {
      await store.attempt()
      return
    } catch (error) {
      return
    }
  }
}