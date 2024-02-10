import { rootApi } from "@/state/services/apiService";
import {
  PostQuestionResponse,
  QuestionFormData,
  QuestionResponse,
} from "./types";

export const questionsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    postQuestions: builder.mutation<PostQuestionResponse, QuestionFormData>({
      query: (payload) => ({
        url: `/chatbot/questions/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Topics"],
    }),

    getQuestions: builder.query<QuestionResponse, void>({
      query: (pageNumber) => ({
        url: `/chatbot/questions/`,
      }),
      providesTags: ["Topics"],
    }),
  }),
});

export const { useGetQuestionsQuery, usePostQuestionsMutation } = questionsApi;
