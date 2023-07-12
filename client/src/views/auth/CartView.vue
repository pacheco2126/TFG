<script setup>
import { useShopStore } from "../../stores/shop";
import Paypal from "../../components/Paypal.vue"

const shop = useShopStore();
</script>

<template>
    <div class="container h-100 py-5" style="background-color: #eee;">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-10">

          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-normal mb-0 text-black">Cesta de la Compra</h3>
          </div>

          <div v-if="shop.cartQuantity > 0" class="flex flex-col lg:flex-row lg:gap-6">
            <div class="divide-y divide-gray-300 lg:w-2/3">
              <div v-for="item in shop.cart" :key="item.id" class="py-6 flex gap-4">

                <div class="card rounded-3 mb-4">
                  <div class="card-body p-4">
                    <div class="row d-flex justify-content-between align-items-center">
                      <div class="col-md-2 col-lg-2 col-xl-2">
                        <img class="img-fluid rounded-3" :alt="item.name" :src="item.image">
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-3">
                        <p class="lead fw-normal mb-2"> {{ item.name }} </p>
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button class="btn btn-link px-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                          <i class="fas fa-minus"></i>
                        </button>

                        <input min="1" type="number" v-model.number="item.quantity"
                          class="form-control form-control-sm" />

                        <button class="btn btn-link px-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 class="mb-0">€{{ item.price }}</h5>
                      </div>
                      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <button class="text-danger btn btn-unstyled" @click="shop.removeItem(item)">
                          <i class="fas fa-trash fa-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card mb-4">
                <div class="card-body p-4 d-flex flex-row">
                  <div class="form-outline flex-fill">
                    <div>Total del Pedido</div>
                    <div><strong>€{{ shop.cartTotal.toFixed(2) }}</strong></div>
                  </div>
                </div>
              </div>

              <div class="card d-flex justify-content-center align-items-center">
                <div class="card-body">
                  <Paypal :amount="shop.cartTotal.toFixed(2)" class="btn btn-block btn-lg"></Paypal>
                  <router-link to="/Tienda" class="btn btn-secondary btn-lg">Volver a la tienda</router-link>
                </div>
              </div>


            </div>
          </div>

          <div v-else class="mt-10">
            Cesta vacía! Añade tu compra
            <i class="bi bi-emoji-smile"></i>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
export default {
  components: {
    Paypal
  }
}
</script>