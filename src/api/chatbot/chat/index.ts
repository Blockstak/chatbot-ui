import { ChatResponse } from "./types";
import { rootApi } from "@/state/services/apiService";

export const chatApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    chat: builder.query<
      ChatResponse,
      {
        message: string;
        topicId: number;
      }
    >({
      query: ({ message, topicId }) => ({
        url: `/chatbot/chat/?message=${message}&topic_id=${topicId}`,
        timeout: 30000,
      }),
    }),
  }),
});

export const { useChatQuery, usePrefetch, useLazyChatQuery } = chatApi;
