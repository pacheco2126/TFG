<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div id="app">
    <NavBar />
    <RouterView/> 
    <footer class="footer">
      © NetInentory 2023
    </footer> 
  </div>

</template>
<style>
body{
  background: url('./images/background.png');
  background-position: center center;
  background-size: cover;
  background-attachment: fixed; 
}
.footer {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0,9rem;
  background-color: #f0f0f066;
} 
</style>
