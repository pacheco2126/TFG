<template>
  <button ref="contactButton" @click="showPopup = true" class="contact-button">Contactanos</button>
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
          <h5 class="card-title" style="color: rgb(242, 242, 242);">Registra tu parte del Skate</h5>
          <form @submit.prevent="submit">
            <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
            <div class="mb-3">
              <label for="id_item" class="form-label" style="color: white;">Objeto</label>
              <select v-model="RegisterDataItem.id_item" class="form-control" id="id_item">
                <option value="Tabla">Tabla</option>
                <option value="Ejes">Ejes</option>
                <option value="Ruedas">Ruedas</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="item_name" class="form-label" style="color: white;">Marca</label>
              <select v-model="RegisterDataItem.item_name" class="form-control" id="item_name" v-if="RegisterDataItem.id_item === 'Tabla'">
                <option value="Jart">Jart</option>
                <option value="Baker">Baker</option>
                <option value="Element">Element</option>
              </select>
              <select v-model="RegisterDataItem.item_name" class="form-control" id="item_name" v-if="RegisterDataItem.id_item === 'Ejes'">
                <option value="Thunder">Thunder</option>
                <option value="Venture">Venture</option>
              </select>
              <select v-model="RegisterDataItem.item_name" class="form-control" id="item_name" v-if="RegisterDataItem.id_item === 'Ruedas'">
                <option value="Element">Element</option>
                <option value="Spitfire">Spitfire</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="Usage" class="form-label" style="color: white;">Uso</label>
              <select v-model="RegisterDataItem.Usage" class="form-control" id="id_item">
                <option value="Nuevo">Nuevo</option>
                <option value="SemiNuevo">Semi Nuevo</option>
                <option value="PocoUsado">Poco Usado</option>
                <option value="Usado">Usado</option>
              </select>           
             </div>
            <button type="submit" class="btn btn-success">Registrar</button>
            <router-link to="/items" class="btn btn-primary" style="margin-left: 30rem;"> Volver a mis objetos</router-link>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore, type RegisterDataItem } from '../../stores/auth';
  import { onMounted, reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  const RegisterDataItem = reactive<RegisterDataItem>({
    id_item: "",
    item_name: "",
    Usage: "",

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
    console.log(RegisterDataItem)
    await authStore.register_item(RegisterDataItem)
      .then(res => {
        router.replace({name: "items"})
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