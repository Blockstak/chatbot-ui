import { rootApi } from "@/state/services/apiService";
import { UploadFileFormData, UploadFileResponse } from "./types";

export const filesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFiles: builder.mutation<UploadFileResponse, UploadFileFormData>({
      query: (payload) => ({
        url: `/chatbot/uploaded_files/`,
        method: "POST",
        body: payload,
      }),
    }),

    getFiles: builder.query<UploadFileResponse, void>({
      query: () => ({ url: `/chatbot/uploaded_files/` }),
    }),
  }),
});

export const { useGetFilesQuery, useUploadFilesMutation } = filesApi;
