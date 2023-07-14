<template>
  <button ref="contactButton" @click="showPopup = true" class="contact-button">Contact us</button>
  <transition name="popup">
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-container" :style="popupStyle">
        <button @click="showPopup = false" class="close-button">X</button>
        <table class="contact-table">
          <thead>
            <tr style="color: white">
              <th>Nombre</th>
              <th>Email</th>
              <th>Telefono</th>
            </tr>
          </thead>
          <tbody>
            <tr style="color: white">
              <td>John Doe</td>
              <td>john.doe@example.com</td>
              <td>123-456-7890</td>
            </tr>
            <tr style="color: white">
              <td>Jane Smith</td>
              <td>jane.smith@example.com</td>
              <td>987-654-3210</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </transition>
    <div id="register">
      <div class="container" style="background-color: transparent;">
        <div class="card card-body mt-4">
          <h5 class="card-title" style="color: rgb(242, 242, 242);">Registrar</h5>
          <form @submit.prevent="submit">
            <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
            <div class="mb-3">
              <label for="username" class="form-label" style="color: white;">Nombre</label>
              <input v-model="registerData.username" type="text" class="form-control" id="username" autocomplete="off">
            </div>
            <div class="mb-3">
              <label for="first_name" class="form-label" style="color: white;">Primer Apellido</label>
              <input v-model="registerData.first_name" type="text" class="form-control" id="first_name" autocomplete="off">
            </div>
            <div class="mb-3">
              <label for="last_name" class="form-label" style="color: white;">Segundo Apellido</label>
              <input v-model="registerData.last_name" type="text" class="form-control" id="last_name" autocomplete="off">
            </div>
            <div class="mb-3">
              <label for="email" class="form-label" style="color: white;">Email</label>
              <input v-model="registerData.email" type="email" class="form-control" id="email" autocomplete="off">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label" style="color: white;">Contraseña</label>
              <input v-model="registerData.password" type="password" class="form-control" id="password">
            </div>
            <div class="mb-3">
              <label for="password_confirm" class="form-label" style="color: white;">Confirma contraseña</label>
              <input v-model="registerData.password_confirm" type="password" class="form-control" id="password_confirm">
            </div>
            <button type="submit" class="btn btn-success">Register</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore, type RegisterData } from '../../stores/auth';
  import { onMounted, reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  const registerData = reactive<RegisterData>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: "",
  })
  
  const errorMessage = ref<string>("")
  const showPopup = ref(false);
  const contactButton = ref<HTMLElement | null>(null);
  const popupStyle = ref({});

  onMounted(() => {
    if (contactButton.value) {
      const buttonRect = contactButton.value.getBoundingClientRect();
      popupStyle.value = {
        bottom: `${window.innerHeight - buttonRect.top}px`,
        left: `${buttonRect.left}px`,
        transform: 'translate(-100%, 0)',
        maxWidth: `${buttonRect.width}px`
      };
    }
  });

  async function submit(){
    await authStore.register(registerData)
      .then(res => {
        router.replace({name: "login"})
      })
      .catch(err => {
        errorMessage.value = err.message
      })
  }
  
  </script>
  
  <style scoped>

  .container{
    margin-top: 10rem;
  }
  #register .card{
    background-color: rgba(255, 255, 255, 0.238);
    max-width: 40vw;
    margin: auto;
  }
  .box {
    background-color: rgba(42, 59, 72, 0.8);
    padding: 2rem;
    margin-top: 1rem;
    border-radius: 5rem;
  }
  .contact-button {
    position: fixed;
    bottom: 20px;
    left: 20px;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-container {
    background-color: transparent;
    border-radius: 4px;
    position: fixed;
    max-width: 90vw;
  }
  
  .close-button {
    position: absolute;
    top: -1rem;
    right: -24.5em;
    padding: 5px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
  }
  
  .contact-table {
    margin-top: 20px;
    margin-left: 10rem;
    border-collapse: collapse;
    width: 100%;
  }
  
  .contact-table th,
  .contact-table td {
    padding: 8px;
    text-align: left;
  }
  
  .contact-table th {
    background-color: #4caf4fa6;
    color: white;
  }
  
  .contact-table td {
    border-bottom: 1px solid black;
    background-color: rgba(255, 255, 255, 0.592);
  }
  
  .popup-enter-active {
    animation: popup-enter 0.3s ease-out;
  }
  
  .popup-leave-active {
    animation: popup-leave 0.3s ease-in;
  }
  
  @keyframes popup-enter {
    0% {
      opacity: 0;
      transform: translate(-100%, 10px);
    }
    100% {
      opacity: 1;
      transform: translate(-100%, 0);
    }
  }
  
  @keyframes popup-leave {
    0% {
      opacity: 1;
      transform: translate(-100%, 0);
    }
    100% {
      opacity: 0;
      transform: translate(-100%, 10px);
    }
  }
  </style>