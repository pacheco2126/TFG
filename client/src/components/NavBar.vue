<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid" style="background-color: black">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        <img src="../images/logo.png" alt="Logo">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#appNavbar"
        aria-controls="appNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="appNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link" aria-current="page" style="color: white;">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'about_us' }" class="nav-link" style="color: white;">About Us</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'sponsors' }" class="nav-link" style="color: white;">Sponsors</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'arquitectos' }" class="nav-link" style="color: white;">Arquitectos</router-link>
          </li>

          <li class="nav-item">
              <router-link :to="{name: 'tienda'}" class="nav-link" style="color: white;">Tienda</router-link>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li v-if="isAuthenticated" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
              style="color: white;">
              {{ user.username }}
            </a>
            <ul class="dropdown-menu">
              <li><router-link :to="{ name: 'items' }" class="dropdown-item">Tus Objetos</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><router-link :to="{ name: 'user' }" class="dropdown-item">Perfil</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><button @click="logout" class="dropdown-item btn btn-danger">Logout</button></li>
            </ul>
          </li>

          <template v-else>
            <li class="nav-item">
              <router-link :to="{ name: 'login' }" class="nav-link" aria-current="page" style="color: white;">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'register' }" class="nav-link" aria-current="page" style="color: white;">Register</router-link>
            </li>
          </template>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { computed } from 'vue';
import { useRouter } from 'vue-router';


const authStore = useAuthStore();
const router = useRouter();

const user = computed(() => {
  return authStore.user;
});

const isAuthenticated = computed(() => {
  return authStore.isAuthenticated;
});

async function logout() {
  await authStore.logout()
    .then(res => {
      router.replace({ name: 'home' });
    })
    .catch(err => {
      console.log(err.message);
    });
}
</script>

<style>
body {
  background: black;
}

nav {
  font-size: 1.2rem;
}

.navbar-brand img {
  height: 50px;
  flex-grow: 1;
}

.dropdown-menu {
  font-size: 1.2rem;
}

.contact-us-dropdown {
  display: none;
  position: absolute;
  background-color: white;
  padding: 10px;
  animation: dropdown-animation 0.3s ease-in-out;
}

.contact-us-dropdown table {
  width: 100%;
}

.contact-us-dropdown table td {
  padding: 5px;
}

@keyframes dropdown-animation {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>
