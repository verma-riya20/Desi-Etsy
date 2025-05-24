
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



// Async thunk for adding or updating cart item on backend
export const addToCartAPI = createAsyncThunk(
  'cart/addToCartAPI',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/cart/add`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.items; // updated cart from backend
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/// ✅ Fixed async thunk to clear cart on backend
export const clearCartAPI = createAsyncThunk(
  'cart/clearCartAPI',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:5000/api/cart/clear`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return []; // empty cart
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to update quantity of a cart item
export const updateCartItemQuantityAPI = createAsyncThunk(
  'cart/updateCartItemQuantityAPI',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/cart/update`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.items;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // This can be useful to locally update items (optional)
    setCartItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addToCartAPI.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      .addCase(clearCartAPI.fulfilled, (state) => {
        state.items = [];
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(clearCartAPI.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(clearCartAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      .addCase(updateCartItemQuantityAPI.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updateCartItemQuantityAPI.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartItemQuantityAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setCartItems } = cartSlice.actions;

export default cartSlice.reducer;
