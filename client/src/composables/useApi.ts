import { axiosInstance, axiosPrivateInstance } from "../utils/axios";
import {useAuthStore} from '../stores/auth'
import { watchEffect } from "vue";
import type { AxiosInstance } from "axios";



export function useApiPrivate(): AxiosInstance  { //devolvemos una instancia axios

  const authStore = useAuthStore()
  // the watch effect it will reactively trigger any functionally inside it based on dependencies
  watchEffect(()=>{ //configuramos interceptores de sol y respuesta. 

    axiosPrivateInstance.interceptors.request.use(
      (config) => { // para agregar el token de acceso del usuer
        if(!config.headers["Authorization"]){
          config.headers["Authorization"] = `Bearer ${authStore.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

   
    // WHY useApiPrivate() and useApi() and axiosInstance | axiosPrivateInstance
// when we do not have any acces token inside auth we get 403 or 401 then
// refresh and then run previus request again
// if no any access token so we logout. 
// that cause a problem if we logout from application in that case all cookies
// will be deleted in server side and no refresh token 
// as we are persistently req the backen for the access token --> error 
// because we do not have any refresh token. We need to use another composable
// another axios instance so we created the the useApiPrivate() and useApi() 

    // Normally if res susccess we move forward to response
    // But if we got error res then
    axiosPrivateInstance.interceptors.response.use( //para manejar errores 
      response => response,
      async (error) => { //intenamos actualizar el token de acceso
        const prevRequest = error?.config
        if((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest.sent){
          prevRequest.sent = true
          try { // we need to call the refresh action from store
            await authStore.refresh()
            prevRequest.headers["Authorization"] = authStore.accessToken // fill auth with the token
            return axiosPrivateInstance(prevRequest) //we return axios instance with prevrequest as parameter
          } catch (error) {
            return Promise.reject(error)
          }
        }
  
        return Promise.reject(error)
      }
    )
  })

  return axiosPrivateInstance
}

export function useApi(){
  return axiosInstance 
}