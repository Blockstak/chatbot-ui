import { createSlice } from "@reduxjs/toolkit";

type User = {
  username: string;
  user_type: number;
  account_id: string;
};

type AuthState = {
  token?: string;
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  token: "",
  user: null,
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
      state.token = action.payload;
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
