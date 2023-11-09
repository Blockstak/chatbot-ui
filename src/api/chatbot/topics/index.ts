import { rootApi } from "@/state/services/apiService";
import { TopicFormData, TopicResponse, PostTopicResponse } from "./types";

export const topicsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    postTopics: builder.mutation<PostTopicResponse, TopicFormData>({
      query: (payload) => ({
        url: `/chatbot/topics/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Topics"],
    }),

    getTopics: builder.query<TopicResponse, void>({
      query: () => ({ url: `/chatbot/topics/` }),
      providesTags: ["Topics"],
    }),
  }),
});

export const { useGetTopicsQuery, usePostTopicsMutation } = topicsApi;
