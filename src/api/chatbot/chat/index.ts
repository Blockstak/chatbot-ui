import { ChatResponse, ChatRequest } from "./types";
import { rootApi } from "@/state/services/apiService";

export const chatApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    chat: builder.query<ChatResponse, ChatRequest>({
      query: ({ message, topicId }) => ({
        url: `/chatbot/chat/?message=${message}&topic_id=${topicId}`,
        timeout: 30000,
      }),
      providesTags: ["Chat"],
    }),
  }),
});

export const { useChatQuery, usePrefetch, useLazyChatQuery } = chatApi;
