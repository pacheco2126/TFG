import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { authentication } from './plugins/authentication'
import router from './router'
import App from './App.vue'


import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap"

const app = createApp(App)

app.use(createPinia())

//call the pluggin 
authentication.install().then(()=>{
    // This is the promise that whenever install method of my pluggin triggers
    // After it is ready to source the promise it will active router and mount the app
  app.use(router)
  app.mount('#app') 
})

