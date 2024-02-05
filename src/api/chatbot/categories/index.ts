import { rootApi } from "@/state/services/apiService";
import { TopicFormData, TopicResponse, PostTopicResponse } from "./types";

export const catagoriesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    postCategory: builder.mutation<PostTopicResponse, TopicFormData>({
      query: (payload) => ({
        url: `/chatbot/categories/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Topics"],
    }),

    getCategories: builder.query<TopicResponse, void>({
      query: () => ({ url: `/chatbot/categories/` }),
      providesTags: ["Topics"],
    }),
  }),
});

export const { useGetCategoriesQuery, usePostCategoryMutation } = catagoriesApi;
