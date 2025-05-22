import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
};

export const cartThunk = createAsyncThunk("cart/add", async (id, thunkAPI) => {
  const state = thunkAPI.getState();
  const product = state.product.data.find((i) => i.id === id);
  if (product) {
    return { ...product, quantity: 1 };
  } else {
    return thunkAPI.rejectWithValue("Product not found");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cartThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartThunk.fulfilled, (state, action) => {
        const existing = state.items.find((i) => i.id === action.payload.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          state.items.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(cartThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { incrementQuantity, decrementQuantity, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
