import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Chat = {
  topic: number;
  error?: boolean;
  botText: string;
  userText: string;
  type: "user" | "bot";
};

type ChatState = {
  chat:
    | {
        text: string;
        error?: boolean;
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
        error?: boolean;
        type: "user" | "bot";
      }>
    ) => {
      if (state.chat) {
        state.chat.push({
          text: action.payload.text,
          type: action.payload.type,
          error: action.payload.error || false,
        });
      } else {
        state.chat = [
          {
            text: action.payload.text,
            type: action.payload.type,
            error: action.payload.error || false,
          },
        ];
      }
    },
  },

  extraReducers: (builder) => {},
});

export const { addChatContent } = chatSlice.actions;

export default chatSlice.reducer;
