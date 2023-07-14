<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import { useShopStore } from "./stores/shop.js";

</script>

<template>
  <div id="app">
    <NavBar />
    <RouterView/> 
    <footer class="footer">
      © SkateGrowth 2023
    </footer> 
  </div>

</template>

<script>
export default {
  data() {
    return { shop: useShopStore() }
  },
  mounted() {
    this.shop.fetchItemData();
  }
};
</script>

<style>
body{
  background: url('./images/background.png');
  background-position: center center;
  background-size: cover;
  background-attachment: fixed; 
}
.footer {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 0,9rem;
  background-color: #f0f0f066;
} 
</style>
