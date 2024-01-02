import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Chat = {
  id: string;
  topic?: number;
  error?: boolean;
  botText: string;
  userText?: string;
  isStreaming?: boolean;
};

type ChatState = {
  chat: Chat[] | null;
};

const initialState: ChatState = {
  chat: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChatContent: (state, action: PayloadAction<Chat>) => {
      if (state.chat) {
        state.chat.push({
          id: action.payload.id,
          topic: action.payload.topic,
          botText: action.payload.botText,
          userText: action.payload.userText,
          error: action.payload.error || false,
          isStreaming: action.payload.isStreaming,
        });
      } else {
        state.chat = [
          {
            id: action.payload.id,
            topic: action.payload.topic,
            botText: action.payload.botText,
            userText: action.payload.userText,
            error: action.payload.error || false,
            isStreaming: action.payload.isStreaming,
          },
        ];
      }
    },

    updateChatContent: (state, action: PayloadAction<Chat>) => {
      if (state.chat) {
        const index = state.chat.findIndex(
          (item) => item.id === action.payload.id
        );

        state.chat[index] = {
          ...state.chat[index],
          botText: action.payload.botText,
          error: action.payload.error || false,
          isStreaming: action.payload.isStreaming,
        };
      }
    },
  },

  extraReducers: (builder) => {},
});

export const { addChatContent, updateChatContent } = chatSlice.actions;

export default chatSlice.reducer;
