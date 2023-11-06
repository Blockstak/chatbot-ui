import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ChatState = {};

const initialState: ChatState = {};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},

  extraReducers: (builder) => {},
});

export const {} = chatSlice.actions;

export default chatSlice.reducer;
