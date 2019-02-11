<template>
  <div class="cart">
    <h1 class="title">Shopping Cart</h1>
    <div class="cartList">
      <div class="cartItem" v-for="(item,index) in cartItems" :key="index">
        <span class="cartItem__info">{{item.title}}</span>
        <span class="cartItem__info">ilość: {{item.quantity}}</span>
        <button class="cartList__button" @click="deleteItem(item.id)">Usun</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      cartItems: "cartItems"
    })
  },
  methods: {
    ...mapActions({
      deleteItem: "deleteItem"
    })
  }
};
</script>

<style lang="scss">
.cartItem {
  &__info {
    padding-right: 20px;
  }
}
</style>
