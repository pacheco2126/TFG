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
    <div class="container">
      <h2>Formulario para Arquitectos</h2>
      <p>¿Eres un arquitecto con ganas de ayudar a que la comunidad skater crezca, ayudando a países subdesarrollados y asi poder tambien darte a conocer?
        Rellena el formulario para poder ser uno de nuestros arquitectos y poder. realizar los proyectos que tenemos en mente.
      </p>
      
      <form @submit.prevent="submit">
        <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
        <div class="mb-3">
          <label for="nombre" class="form-label" style="color: white;">Nombre</label>
          <input v-model="registerArquitect.username" type="text" class="form-control" id="username">
        </div>
        <div class="mb-3">
          <label for="apellidos" class="form-label" style="color: white;">Apellidos</label>
          <input v-model="registerArquitect.first_name" type="text" class="form-control" id="first_name">
        </div>
        <div class="mb-3">
          <label for="email" class="form-label" style="color: white;">Email</label>
          <input v-model="registerArquitect.email" type="email" class="form-control" id="email" >
        </div>
        <div class="mb-3">
          <label for="cv" class="form-label" style="color: white;">CV</label>
          <input type="file" id="CV" ref="cv" accept=".pdf,.doc,.docx" required>
        </div>
        <div class="mb-3">
          <label for="proyectos" class="form-label" style="color: white;">Proyectos</label>
          <input v-model="registerArquitect.projects" type="text" class="form-control" id="projects" >
        </div>
        <button type="submit" class="btn btn-primary">Enviar</button>
        <p v-if="successMessage" class="success-message text-success mb-4">¡Registro exitoso!</p>
      </form>
    </div>
  </template>

<script setup lang="ts">
import { useAuthStore, type RegisterArquitect } from '../stores/auth';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

const registerArquitect = reactive<RegisterArquitect>({
  username: "",
  first_name: "",
  email: "",
  CV: null,
  projects: "",

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

const successMessage = ref<boolean>(false)

async function submit(){
  await authStore.register_arquitect(registerArquitect)
  .then(res => {
      successMessage.value = true // Establece el mensaje de éxito en true
      setTimeout(() => {
        router.replace({name: "arquitectos"})
      }, 2000) // Redirige después de 2 segundos
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