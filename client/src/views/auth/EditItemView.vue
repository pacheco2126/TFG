<template>
  <button ref="contactButton" @click="showPopup = true" class="contact-button">Contact us</button>
  <transition name="popup">
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-container" :style="popupStyle">
        <button @click="showPopup = false" class="close-button">X</button>
        <table class="contact-table">
          <thead>
            <tr style="color: white">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
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
    <div id="edit">
      <div class="container" style="background-color: transparent;" >
        <div class="card card-body mt-4">
          <h5 class="card-title" style="color: white;">Edit and Save Changes</h5>
          <form @submit.prevent="submit">
            <div class="mb-3"> 
              <label for="id_item" class="form-label" style="color: white;">Item ID</label>
              <input v-model="EditDataItem.id_item" type="text" class="form-control" id="id_item" autocomplete="off" :placeholder=EditDataItem.id_item></div>
            <div class="mb-3">
              <label for="item_name" class="form-label" style="color: white;">Item Name</label>
              <input v-model="EditDataItem.item_name" type="text" class="form-control" id="item_name" autocomplete="off" :placeholder=EditDataItem.item_name>  </div>
            <div class="mb-3">
                <label for="Assigned_to" class="form-label" style="color: white;">Assigned to</label>
                <input v-model="EditDataItem.Assigned_to" type="text" class="form-control" id="Assigned_to" autocomplete="off" :placeholder=EditDataItem.Assigned_to> </div>
            <button type="submit" class="btn btn-success" style="color: white;">Edit Item</button>
            <router-link to="/items" class="btn btn-primary" style="margin-left: 30rem;"> Go back to Items</router-link>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore, type EditDataItem } from '../../stores/auth';
  import { computed, onMounted, reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore()
  const router = useRouter()


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

  const itemsV = computed(() => {
    console.log("vamos a ver esto que es", authStore.items)
    itemsV.value
    return authStore.items
  })

  const EditDataItem = reactive<EditDataItem>({
    id_item: "",
    item_name: "",
    Assigned_to: "",
  })
  
  const errorMessage = ref<string>("")

  async function submit(){
    await authStore.edit_item(EditDataItem)
      .then(res => {
        router.replace({name: "items"})
      })
      .catch(err => {
        errorMessage.value = err.message
      })
  }
  
  </script>
  
  <style scoped>
  #edit .card{
    background-color: rgba(255, 255, 255, 0.238);
    max-width: 40vw;
    margin: auto;
  }
  .container{
    margin-top: 10rem;
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