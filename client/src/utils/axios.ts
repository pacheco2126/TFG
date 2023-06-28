import axios from "axios"

axios.defaults.withCredentials = true; 
//para que las cookies se envíen automáticamente con las solicitudes.


// axiosPrivateInstance para realizar solicitudes que requieren 
// axiosInstance para realizar solicitudes públicas sin autenticación.
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json', 
  }
})

export const axiosPrivateInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})