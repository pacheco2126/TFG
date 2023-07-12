<template>
  <div class="card">
    <div class="card-content">
      <div class="item-info">
        <div class="item-image-container">
          <img :src="item.image" alt="Item image" class="item-image">
        </div>
        <div class="item-details">
          <h6 class="item-name">{{ item.name }} 
            <span style="color: #7769ff; font-size: 15px;">({{ item.symbol }})</span></h6>
        </div>
      </div>
      <div class="item-description">
        <p class="desc">{{ item.description }}</p>
      </div>
      <div class="price-container">
          <div class="item-price">
            <strong>Precio</strong><br>
            <p class="price">€{{ item.price }}</p>
          </div>
          <div class="add-to-cart">
            <button class="bi-cart3 buttons" @click="addToCart(item)">
              Añadir al carrito
            </button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemCard",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToCart(item) {
      this.$emit("add-to-cart", item);
    },
  },
};
</script>
  
<style scoped>
.card {
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
}

.item-image {
  width: 16rem;
  height: 15rem;
  border-radius: 0,2rem;
}

.card-content {
  display: grid;
  grid-template-rows: auto auto auto;
  align-items: start;
  border: 1px solid #ccc;
  padding: 1rem;
}

.item-info {
  display: flex;
  align-items: center;
}

.item-image-container {
  margin-right: 0.9rem;
}

.item-details {
  display: flex;
  align-items: center;
}

.item-name {
  font-size: 1rem;
  font-weight: bold;
}

.item-description {
  font-size: 1rem;
  line-height: 1.5;
  overflow: auto;
  text-overflow: ellipsis;
}

.item-price {
  margin-right: 0.9rem;
  float: left;
}

.add-to-cart {
  margin-left: auto;
  float: right;
}

.buttons {
  background: linear-gradient(to right, #7769ff, #5a8afe);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0,5rem 1rem;
  transition: background-color 0.3s ease;
}

.buttons:hover {
  background: linear-gradient(to right, #7061f6, #497df5);
}

.desc {
  text-align: justify;
  text-justify: inter-word;
}

.price-container{
  padding-top: 1,2rem;
  border-top: 1px solid #ccc;
}

.price{
  font-size: 1.1em;
  font-family: "Montserrat";
}
</style> 