<template>
  <div id="item">
    <h1>Items here</h1>
    <div class="container">
      <RouterLink to="/register_item" class="btn btn-primary" style="position: relative;">Register Item</RouterLink>  
      <input type="text" v-model="searchTerm" placeholder="Search items..." >
      <Suspense>
        <template #default>
          <div v-if="!isLoading" v-for="item in filteredItems" :key="item.id_item" class="card card-body mt-4" style="background-color: rgba(255, 255, 255, 0.554);">
            <h5 class="card-title" style="color:rgb(71, 62, 73)">Item Id: {{ item.id_item }}</h5>
            <h6 class="card-subtitle mb-2" style="color:rgb(71, 62, 73)">Item Name: {{ item.item_name }}</h6>
            <h6 class="card-subtitle mb-2" style="color:rgb(71, 62, 73)">Assigned to: {{ item.Assigned_to }}</h6>
            <router-link :to="`/edit_item/${item.id_item}`" class="btn btn-primary">Edit Items</router-link>
            <button @click="deleteItem(item)" class="btn btn-danger">Delete Item</button> 
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
import { computed, onMounted, ref, watch } from 'vue';

const authStore = useAuthStore();

const isLoading = ref(true);
let searchTerm = ref('');
let originalItems = computed(() => authStore.items);
console.log("original items", originalItems.value)

watch(searchTerm, searchItems);


function searchItems() {
  if (!searchTerm.value) {
    return originalItems.value;
  }
  return originalItems.value.filter((item) => {
    return item.item_name.toLowerCase().includes(searchTerm.value.toLowerCase());
  });
}

const filteredItems = ref([]  as ItemData[]);

onMounted(async () => {
  try {
    await authStore.getItem();  
    isLoading.value = false;
    filteredItems.value = originalItems.value;
  } catch (error) {
    console.error('Error getting items:', error);
  }

});


async function deleteItem(item: ItemData) {
  console.log("el item a borrar es", item.Assigned_to)
  try {
    await authStore.deleteItem(item);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}

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

</style>
