import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    initializeCart: (state) => {
      const cart = localStorage.getItem("cart");
      if (!cart) {
        localStorage.setItem("cart", JSON.stringify([]));
      } else {
        state.items = JSON.parse(cart);
      }
    },
    addToCart: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    addQty: (state, action) => {
      state.items.forEach((item) => {
        if (item.productId === action.payload.id) {
          item.qty = parseInt(item.qty) + 1;
          item.subtotal = item.productPrice * item.qty;
          localStorage.setItem("cart", JSON.stringify(state.items));
        }
      });
    },
    minusQty: (state, action) => {
      state.items.forEach((item) => {
        if (item.productId === action.payload.id && item.qty > 0) {
          item.qty = parseInt(item.qty) - 1;
          item.subtotal = item.productPrice * item.qty;
          localStorage.setItem("cart", JSON.stringify(state.items));
        }
      });
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    resetCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const {
  initializeCart,
  addToCart,
  addQty,
  minusQty,
  deleteItem,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
