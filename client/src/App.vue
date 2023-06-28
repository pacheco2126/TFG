<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div id="app">
    <NavBar />
    <RouterView/>
  </div>
</template>
<style>
body{
  background: url('./images/background.png');
  background-position: center center;
  background-size: cover;
  background-attachment: fixed; /* Fija el fondo de pantalla */
}
</style>
