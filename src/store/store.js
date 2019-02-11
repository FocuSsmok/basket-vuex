import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { books } from "../api/books.json";

export default new Vuex.Store({
    state: {
        books: books,
        cart: []
    },
    getters: {
        cartItems(state) {
            const items = state.cart.map(item => {
                const book = state.books.find(book => book.id === item.id);
                return {
                    id: item.id,
                    title: book.title,
                    quantity: item.quantity
                };
            });
            return items;
        },
        bookInStock() {
            return inventory => {
                return inventory ? true : false;
            };
        }
    },
    mutations: {
        ADD_TO_CART(state, payload) {
            state.cart.push({ id: payload, quantity: 1 });
        },
        INCREMENT_QUANTITY(state, payload) {
            const cartItem = state.cart.find(item => item.id === payload);
            cartItem.quantity++;
        },
        DECREMENT_BOOKS(state, payload) {
            const cartItem = state.books.find(item => item.id === payload);
            cartItem.inventory--;
        },
        DECREMENT_QUANTITY(state, id) {
            const cartItem = state.cart.find(item => item.id === id);
            cartItem.quantity--;
        },
        INCREMENT_BOOKS(state, id) {
            const cartItem = state.books.find(item => item.id === id);
            cartItem.inventory++;
        },
        DELETE_ITEM(state, id) {
            let indexItem;
            state.cart.filter((item, index) => {
                if (item.id === id) {
                    indexItem = index;
                }
            });
            if (typeof indexItem !== "undefined") {
                state.cart.splice(indexItem, 1);
            }
        }
    },
    actions: {
        addToCart({ commit, state }, { id }) {
            const item = state.books.find(item => item.id === id);
            if (item.inventory > 0) {
                let cartItem = state.cart.find(item => item.id === id);
                if (cartItem) {
                    commit("INCREMENT_QUANTITY", id);
                } else {
                    commit("ADD_TO_CART", id);
                }
                commit("DECREMENT_BOOKS", id);
            }
        },
        deleteItem({ commit, state }, id) {
            const item = state.cart.find(item => item.id === id);
            if (item) {
                if (item.quantity === 1) {
                    commit("DELETE_ITEM", id);
                    commit("INCREMENT_BOOKS", id);
                } else {
                    commit("DECREMENT_QUANTITY", id);
                    commit("INCREMENT_BOOKS", id);
                }
            }
        }
    }
});
