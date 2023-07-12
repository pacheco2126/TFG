import { defineStore } from "pinia";

import axios from 'axios';

export const useShopStore = defineStore("shop", {
  state: () => {
    return {
      items: [],
      cart: [],
      originalItems: [],
      itemSearch: ""
    };
  },
  getters: {
    cartQuantity() {
      return this.cart.reduce((prev, curr) => {
        return prev + curr.quantity;
      }, 0);
    },
    cartTotal() {
      return this.cart.reduce((prev, curr) => {
        return prev + curr.price * curr.quantity;
      }, 0);    },
  },
  actions: {
    addToCart(item) {
      const existingId = this.cart
        .findIndex((cartItem) => cartItem.id === item.id);

      if (existingId !== -1) {
        this.cart[existingId].quantity += 1;
      } else {
        this.cart.push({
          ...item,
          quantity: 1,
        });
      }
    },
    removeItem(targetItem) {
      this.cart = this.cart.filter((item) => item.id !== targetItem.id);
    },

    fetchItemData() {
      axios.get("http://localhost:3000/api/items")
        .then((response) => {
          this.items = response.data;
          this.originalItems = this.items;
          console.log(this.items);
        })
        .catch((error) => {
          console.error(error);
        });

    },
    searchItems() {
      if (this.itemSearch === "") {
          this.items = this.originalItems;
          return;
      }

      const searchedItems = this.originalItems.filter((item) =>
          item.name.toLowerCase().includes(this.itemSearch.toLowerCase())
      );

      this.items = searchedItems;
  },
  },
});