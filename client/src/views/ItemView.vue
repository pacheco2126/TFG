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
  <div id="item">
    <h1>Tus Objetos here</h1>
    <div class="container">
      <RouterLink to="/register_item" class="btn btn-primary" style="position: relative;">Registrar Objeto</RouterLink>
      <img src="../images/skate.png" alt="Tus logros">
      <Suspense>
        <template #default>
          <div v-for="item in filteredItems" :key="item.id_item" class="card card-body mt-4" style="background-color: rgba(255, 255, 255, 0.554);">
            <h5 class="card-title" style="color:rgb(71, 62, 73)">Item Id: {{ item.id_item }}</h5>
            <h6 class="card-subtitle mb-2" style="color:rgb(71, 62, 73)">Item Name: {{ item.item_name }}</h6>
            <h6 class="card-subtitle mb-2" style="color:rgb(71, 62, 73)">Assigned to: {{ item.Assigned_to }}</h6>
          </div>
        </template>

        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore, type ItemData } from '../stores/auth';
import { onMounted, ref, watch } from 'vue';

const authStore = useAuthStore();

const isLoading = ref(true);
const searchTerm = ref('');
const originalItems = ref([] as ItemData[]);
const filteredItems = ref([] as ItemData[]);
const showPopup = ref(false);
const contactButton = ref<HTMLElement | null>(null);
const popupStyle = ref({});

onMounted(async () => {
  if (contactButton.value) {
    const buttonRect = contactButton.value.getBoundingClientRect();
    popupStyle.value = {
      bottom: `${window.innerHeight - buttonRect.top}px`,
      left: `${buttonRect.left}px`,
      transform: 'translate(-100%, 0)',
      maxWidth: `${buttonRect.width}px`
    };
  }
  try {
    await authStore.getItem();
    isLoading.value = false;
    originalItems.value = authStore.items;
    filteredItems.value = authStore.items;
  } catch (error) {
    console.error('Error getting items:', error);
  }
});

watch(searchTerm, (newValue) => {
  if (!newValue) {
    filteredItems.value = originalItems.value;
  } else {
    filteredItems.value = originalItems.value.filter((item) => {
      return item.item_name.toLowerCase().includes(newValue.toLowerCase());
    });
  }
});

</script>

<style>


#item h1 {
  text-align: center;
}

#item .container {
  background-color: rgba(255, 255, 255, 0.554);
  padding: 1rem;
  margin: 10rem;
  border-radius: 1rem;
}

#item .container input {
  width: 100%;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
}

#item .container .card {
  background-color: rgba(255, 255, 255, 0.554);
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
} 

#item .container .card .card-title {
  color: white;
} 


#item .container .card .card-subtitle {
  color: white;
}

#item .container .card .btn {
  margin: 10px;
  border-radius: 10px;
}

#item .container .card .btn-primary {
  background-color: #4CAF50;
  border-color: #4CAF50;
}

#item .container .card .btn-danger {
  background-color: #f44336;
  border-color: #f44336;
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
