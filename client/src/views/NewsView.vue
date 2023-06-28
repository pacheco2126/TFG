<template>
  <div>
    <h1 style="color: aliceblue;">Latest Technology News</h1>
    <ul>
      <li v-for="article in articles" :key="article" style="color:aliceblue">
        
        <img :src="article.urlToImage" alt="article image" :href="article.url"  />
        
        <h3 style="background-color: rgba(42, 59, 72, 0.467);">{{ article.title }}</h3>
        <p style="background-color: rgba(42, 59, 72, 0.467);">{{ article.description }}</p>
        <a :href="article.url" target="_blank" style="color: aliceblue;">Read more</a>
    </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const articles = ref([""]);

onMounted(fetchNews);

async function fetchNews() {
  try {
    const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1125c5670e3a4afdb3805933240dee63");
    const data = await response.json();
    articles.value = data.articles;
    articles.value = articles.value.slice(0, 5);
} catch (error) {
    console.log(error);
  }
}
</script>
