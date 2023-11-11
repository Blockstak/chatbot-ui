import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ChatState = {
  chat:
    | {
        text: string;
        type: "user" | "bot";
      }[]
    | null;
};

const initialState: ChatState = {
  chat: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChatContent: (
      state,
      action: PayloadAction<{
        text: string;
        type: "user" | "bot";
      }>
    ) => {
      if (state.chat) {
        state.chat.push({
          text: action.payload.text,
          type: action.payload.type,
        });
      } else {
        state.chat = [
          {
            text: action.payload.text,
            type: action.payload.type,
          },
        ];
      }
    },
  },

  extraReducers: (builder) => {},
});

export const { addChatContent } = chatSlice.actions;

export default chatSlice.reducer;
