<template>
  <div class="products">
    <h1>Product List</h1>
    <div class="product" v-for="book in books" :key="book.id">
      <span class="product__info">id: {{book.id}}</span>
      <span class="product__info">{{book.title}}</span>
      <span class="product__info">ilość: {{book.inventory}}</span>
      <button
        class="product__add-to-basket"
        :disabled="!bookInStock(book.inventory)"
        @click="addToCart(book)"
      >Dodaj do koszyka</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({ bookInStock: "bookInStock" }),
    ...mapState({ books: state => state.books })
  },
  methods: {
    ...mapActions({
      addToCart: "addToCart"
    })
  }
};
</script>

<style lang="scss">
.product {
  &__info {
    padding-right: 10px;
  }
  &__add-to-basket {
  }
}
</style>
