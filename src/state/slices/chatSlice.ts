import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Source = {
  id?: string;
  userText?: string;
  source_urls: string[];
  page_numbers: number[];
  text_contents: string[];
};

type Chat = {
  id: string;
  topic?: number;
  error?: boolean;
  botText: string;
  userText?: string;
  isStreaming?: boolean;
  sources: Source | null;
};

type ChatState = {
  chat: Chat[] | null;
  currentSources: Source | null;
};

const initialState: ChatState = {
  chat: null,
  currentSources: null,
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
          sources: action.payload.sources,
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
            sources: action.payload.sources,
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
          sources: action.payload.sources,
          botText: action.payload.botText,
          error: action.payload.error || false,
          isStreaming: action.payload.isStreaming,
        };
      }
    },

    clearChatContent: (state) => {
      state.chat = null;
    },

    setCurrentSources: (state, action: PayloadAction<Source | null>) => {
      state.currentSources = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { addChatContent, updateChatContent, setCurrentSources } =
  chatSlice.actions;

export default chatSlice.reducer;
