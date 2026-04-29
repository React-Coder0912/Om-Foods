import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    // ✅ Add item or increase qty
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
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.qty += 1;
    },

    // ✅ Decrease quantity or remove item
    decreaseQty: (state, action) => {
      const index = state.items.findIndex(i => i.id === action.payload);
      if (index !== -1) {
        if (state.items[index].qty > 1) {
          state.items[index].qty -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
    },

    // ✅ Remove selected items (NEW)
    removeSelectedItems: (state, action) => {
      const selectedIds = action.payload; // array of ids
      state.items = state.items.filter(
        item => !selectedIds.includes(item.id)
      );
    },

    // ✅ Clear entire cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  increaseQty,
  decreaseQty,
  removeSelectedItems, // ✅ export
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;