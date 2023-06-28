<template>
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

  onMounted(async () => {


  });

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

  </style>