import {defineStore} from "pinia"
import {useApi, useApiPrivate} from "../composables/useApi"

export interface User{
  id: number,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  full_name?: string // el ? significa que es opcional
}

export interface Item{
  id_item: string,
  item_name: string,
  Assigned_to: string, //name or in_Store
}

export interface ItemQuery {
  id_item: string
}

export interface State{
  user: User,
  accessToken: string,
  authReady: boolean,
  items: Item[] // Se almacena una lista de objetos item
}

export interface LoginData {
  email: string,
  password: string
}

export interface ItemData {
  id_item: string,
  item_name: string,
  Assigned_to: string,
}

export interface RegisterData {
  username: string,
  email: string,
  first_name: string,
  last_name: string
  password: string,
  password_confirm: string,
}

export interface RegisterDataItem {
  id_item: string,
  item_name: string,
  Assigned_to: string,
}
export interface EditDataItem {
  id_item: string,
  item_name: string,
  Assigned_to: string,
}

// 3 objects 
export const useAuthStore = defineStore('auth', {
  state: (): { user: User, accessToken: string, authReady: boolean, items: Item[] } => {
    return {
      user: {} as User,
      accessToken: "" as string,
      authReady: false as boolean,
      items: [] as Item[] // Inicializa la lista de items como un array vacío  
      }
  },

  getters: {
    userDetail: (state: State) => state.user, //devuelve el objeto de usuario del estado
    isAuthenticated: (state: State) => state.accessToken ? true : false,
    itemDetail: (state: State) => state.items // devuelve el objeto de item
    // devuelve bool que indica si el user está auth o no
  },
  
// it will run refresh token, it will trigger refresh action. so we can get a new accesstoekn
// to get user data we run get User.  
actions:{
    async attempt(){ // intenta actualizar el token de acceso y obtiene los detalles
      try {
        await this.refresh()
        await this.getUser()
      } catch (error) {
        return
      }
      return
    },

    // WHICH Actions should use useApi() and useApiPrivate()
    // it is obvious that login and register have to use useApi because 
    // private one is meant for routes which actually requires access token 
    // and refresh token in the cookie. Oposite the others

    async login(payload: LoginData){ //inicia sesion con las credenciales del payload
      try {
        const {data} = await useApi().post(`/api/auth/login`, payload);
        this.accessToken = data.access_token //actualiza el token
        await this.getUser() //get and set the user data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async register(payload: RegisterData){
      try {
        const {data} = await useApi().post(`/api/auth/register`, payload); //solicitudes privadas
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async register_item(payload: RegisterDataItem){
      try {
        const {data} = await useApiPrivate().post(`/api/auth/register_item`, payload); //solicitudes privadas
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async edit_item(payload: EditDataItem){ //inicia sesion con las credenciales del payload
      try {
        const {data} = await useApiPrivate().post(`/api/auth/edit_item`, payload);
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async deleteItem(payload: ItemData) {
        // Verifica que el objeto `item` tenga la propiedad `id_item`
      if (!payload.id_item) {
        console.error('Invalid item:', payload.item_name);
        return;
      }
      try {
        console.log("Este es el item que se borra", payload.Assigned_to)
        const { data } = await useApiPrivate().post(`/api/auth/delete_item`, payload);
        return data;
      } catch (error: Error | any) {
        throw error.message;
      }
    },
    

    async getUser(){ //obtiene los detalles del user 
      try {
        const {data} = await useApiPrivate().get(`/api/auth/user`);
        this.user = data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },
  
    async getItem(){ //obtiene los detalles del item 
      try {
        const {data} = await useApiPrivate().get(`/api/auth/item`);
        this.items = data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async getItembyid(id: string) {
      try {
        const { data } = await useApiPrivate().get(`/api/auth/item/${id}`);
        return data;
      } catch (error: Error | any) {
        throw error.message;
      }
    },

 
    async logout(){ //cierra sesion 
      try {
        const {data} = await useApiPrivate().post(`/api/auth/logout`);
        this.accessToken = ""
        this.user = {} as User
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async refresh(){ //actualiza el token del user
      try {
        const {data} = await useApi().post(`/api/auth/refresh`); //solicitudes publicas
        this.accessToken = data.access_token
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    }
  }
})