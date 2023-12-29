import { rootApi } from "@/state/services/apiService";
import { UploadFileFormData, UploadFileResponse } from "./types";

export const filesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFiles: builder.mutation<UploadFileResponse, UploadFileFormData>({
      query: (payload) => ({
        url: `/chatbot/files/`,
        method: "POST",
        body: payload,
      }),
      //invalidatesTags: ["Files"],
    }),

    getFiles: builder.query<UploadFileResponse, null>({
      query: () => ({ url: `/chatbot/files/` }),
      //providesTags: ["Files"],
    }),
  }),
});

export const {
  useGetFilesQuery,
  useLazyGetFilesQuery,
  useUploadFilesMutation,
} = filesApi;
