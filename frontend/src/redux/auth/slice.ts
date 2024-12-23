import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/user";
import { handleAsyncAction } from "@/utils/asyncSliceHelper";
import * as actionTypes from "@/redux/auth/actionTypes";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    handleAsyncAction(builder, actionTypes.AUTH_LOGIN, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });

    handleAsyncAction(builder, actionTypes.AUTH_LOGOUT, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { resetError } = authSlice.actions;

export default authSlice.reducer;
