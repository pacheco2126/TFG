<template>
    <div id="register">
      <div class="container" style="background-color: transparent;">
        <div class="card card-body mt-4">
          <h5 class="card-title" style="color: rgb(242, 242, 242);">Register Item</h5>
          <form @submit.prevent="submit">
            <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
            <div class="mb-3">
              <label for="id_item" class="form-label" style="color: white;">Item id</label>
              <input v-model="RegisterDataItem.id_item" type="text" class="form-control" id="id_item" autocomplete="off">
            </div>
            <div class="mb-3">
              <label for="item_name" class="form-label" style="color: white;">Item Name</label>
              <input v-model="RegisterDataItem.item_name" type="text" class="form-control" id="item_name" autocomplete="off">
            </div>
            <div class="mb-3">
              <label for="Assigned_to" class="form-label" style="color: white;">Assigned to</label>
              <input v-model="RegisterDataItem.Assigned_to" type="text" class="form-control" id="Assigned_to" autocomplete="off">
            </div>
            <button type="submit" class="btn btn-success">Register</button>
            <router-link to="/items" class="btn btn-primary" style="margin-left: 30rem;"> Go back to Items</router-link>

          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore, type RegisterDataItem } from '../../stores/auth';
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  const RegisterDataItem = reactive<RegisterDataItem>({
    id_item: "",
    item_name: "",
    Assigned_to: "",

  })
  
  const errorMessage = ref<string>("")
  
  async function submit(){
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
  </style>