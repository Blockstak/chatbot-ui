import { rootApi } from "@/state/services/apiService";
import { ProcessDocsData, ProcessDocsResponse } from "./types";

export const chatUtilsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    processDocs: builder.mutation<ProcessDocsData, ProcessDocsResponse>({
      query: (payload) => ({
        url: `/chatbot/process-docs/${payload.id}/`,
        method: "POST",
        body: payload,
      }),
    }),

    getFolderPath: builder.query<ProcessDocsResponse, string>({
      query: (id) => ({ url: `/chatbot/get_folder_path/${id}/` }),
    }),
  }),
});

export const { useGetFolderPathQuery, useProcessDocsMutation } = chatUtilsApi;
