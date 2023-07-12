<script setup>
import { useShopStore } from "../stores/shop";
import ItemCard from "../components/ItemCard.vue";

const shop = useShopStore();
console.log(shop.items);
</script>

<template>
    <div class="input-group ps-3">
        <div id="navbar-search-autocomplete" class="form-outline">
          <input type="text" name="search" v-model="shop.itemSearch" class="form-control" placeholder="Buscar criptomoneda" v-on:keyup="shop.searchItems()" />
        </div>
      </div>
  
      <RouterLink class="d-flex gap-1 text-decoration-none text-black ps-3" to="/c">
        <i class="bi bi-cart3"></i>
        <span class="text-black">{{ shop.cartQuantity }}</span>
      </RouterLink>

    <div id="all-items">
        <div class="card-grid">
            <ItemCard v-for="item in shop.items" 
            :key="item.id" 
            :item="item" 
            @add-to-cart="shop.addToCart" />
        </div>
    </div>
</template>

<script>
export default {
    components: {
        ItemCard
    }
  }
</script>

<style scoped>
.card-grid {
    margin-top:3rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: 1.5rem;
}

#all-items{
    position: relative;
    margin: 0 auto; /* Centrar el contenedor horizontalmente */
}
</style>