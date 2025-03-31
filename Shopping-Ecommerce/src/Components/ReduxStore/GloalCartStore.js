import { configureStore, createSlice } from "@reduxjs/toolkit";

export const cartList = createSlice({
  name: "cartListItems",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addCartItem: (state, action) => {
      // console.log(action.payload);

      // state.cartItems = [...state.cartItems, action.payload];

      const selectedItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      // If the item is found, increment its quantity
      if (selectedItem) {
        const addedNewCartItem = state.cartItems.map((item) => {
          if (item.id === selectedItem.id) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity,
            }; // Increment the quantity
          }
          return [...state.cartItems, action.payload]; // Return the other items unchanged
        });

        state.cartItems = addedNewCartItem; // Update the state
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
    },
    deleteCartItem: (state, action) => {
      const filteredCartItems = state.cartItems.filter(
        (items) => items.id !== action.payload
      );
      state.cartItems = filteredCartItems;
    },
    removeCartList: (state, action) => {
      state.cartItems = [];
    },
    incrementCartItemQuantity: (state, action) => {
      const selectedItem = state.cartItems.find(
        (item) => item.id === action.payload
      );

      // If the item is found, increment its quantity
      if (selectedItem) {
        const incrementedCartItem = state.cartItems.map((item) => {
          if (item.id === selectedItem.id) {
            return { ...item, quantity: item.quantity + 1 }; // Increment the quantity
          }
          return item; // Return the other items unchanged
        });

        state.cartItems = incrementedCartItem; // Update the state
      }
    },
    decrementCartItemQuantity: (state, action) => {
      const selectedItem = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (selectedItem && selectedItem.quantity > 0) {
        state.cartItems = state.cartItems.map((item) =>
          item.id === selectedItem.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else if (selectedItem && selectedItem.quantity === 0) {
        // Instead of removing the item, just leave it with quantity 0
        state.cartItems = state.cartItems.map((item) =>
          item.id === selectedItem.id
            ? { ...item, quantity: 0 } // Ensure quantity stays 0
            : item
        );
      }
    },
  },
});

export const {
  addCartItem,
  deleteCartItem,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
  removeCartList,
} = cartList.actions;

export const store = configureStore({
  reducer: {
    cartListItems: cartList.reducer,
  },
});
