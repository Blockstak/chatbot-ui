import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type File = {
  id: number;
  file: string;
  topic: number;
  topic_name: string;
  uploaded_at: Date | string;
};

export type FileResponse = {
  count: number;
  results: File[];
  next: string | number | null;
  previous: string | number | null;
};

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
  files: FileResponse | null;
};

type ChatState = {
  chat: Chat[];
  currentSources: Source | null;
};

const initialState: ChatState = {
  chat: [],
  currentSources: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChatContent: (state, action: PayloadAction<Chat>) => {
      state.chat.push(action.payload);
    },

    updateChatContent: ({ chat }, action: PayloadAction<Chat>) => {
      const index = chat.findIndex((item) => item.id === action.payload.id);

      chat[index] = {
        ...chat[index],
        ...action.payload,
      };
    },

    clearChatContent: (state) => {
      state.chat = [];
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
