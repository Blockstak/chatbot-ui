import { topicsApi } from "@/api/chatbot/topics";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TopicResult = {
  id: number;
  name: string;
  user: number;
};

type Topic = {
  next: string;
  count: number;
  previous: string;
  results: TopicResult[];
};

type TopicState = {
  topics: Topic | null;
};

const initialState: TopicState = {
  topics: null,
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setTopics(state, action: PayloadAction<Topic>) {
      state.topics = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      topicsApi.endpoints.getTopics.matchFulfilled,
      (state, action) => {
        state.topics = action.payload;
      }
    );
  },
});

export const {} = topicSlice.actions;

export default topicSlice.reducer;
