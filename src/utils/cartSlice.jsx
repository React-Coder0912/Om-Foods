import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    // Add item or increase qty
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
    },

    // ✅ Increase quantity
    increaseQty: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(i => i.id === itemId);
      if (item) {
        item.qty += 1;
      }
    },

    // ✅ Decrease quantity or remove
    decreaseQty: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex(i => i.id === itemId);

      if (itemIndex !== -1) {
        if (state.items[itemIndex].qty > 1) {
          state.items[itemIndex].qty -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;