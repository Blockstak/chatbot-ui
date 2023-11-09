import { authApi } from "@/api/auth";
import { createSlice } from "@reduxjs/toolkit";

type User = {
  email: string;
  username: string;
  refresh_token: string;
};

type AuthState = {
  user: User | null;
  access_token?: string;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  access_token: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },

    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    setToken(state, action) {
      state.access_token = action.payload;
    },

    logout: (state) => {
      window.sessionStorage.clear();
      return initialState;
    },
  },

  extraReducers: (builder) => {},
});

export const { setUser, setAuthenticated, setToken, logout } =
  authSlice.actions;

export default authSlice.reducer;
