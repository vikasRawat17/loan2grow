import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { create } from "framer-motion/client";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const loginAuthSlice = createAsyncThunk(
  "auth/login",
  async (creds, thunkAPI) => {
    try {
      const storedUser = localStorage.getItem("userCredentials");

      if (!storedUser) {
        return thunkAPI.rejectWithValue("No user found. Please sign up first.");
      }
      const userData = JSON.parse(storedUser);
      if (
        creds.email !== userData.email ||
        creds.password !== userData.password
      ) {
        return thunkAPI.rejectWithValue("Invalid credentials");
      }
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signUpAuthSlice = createAsyncThunk(
  "auth/singup",
  async (userData, thunkAPI) => {
    try {
      localStorage.setItem("userCredentials", JSON.stringify(userData));
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAuthSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAuthSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginAuthSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(signUpAuthSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpAuthSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpAuthSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
