import { rootApi } from "@/state/services/apiService";
import { TopicFormData, TopicResponse } from "./types";

export const filesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    postTopics: builder.mutation<TopicFormData, TopicResponse>({
      query: (payload) => ({
        url: `/chatbot/topics/`,
        method: "POST",
        body: payload,
      }),
    }),

    getTopics: builder.query<TopicResponse, void>({
      query: () => ({ url: `/chatbot/topics/` }),
    }),
  }),
});

export const {} = filesApi;
