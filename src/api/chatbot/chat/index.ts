import { ChatResponse } from "./types";
import { rootApi } from "@/state/services/apiService";

export const chatApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    chat: builder.query<ChatResponse, void>({
      query: () => ({ url: `/chatbot/get_folder_path/` }),
    }),
  }),
});

export const {} = chatApi;
