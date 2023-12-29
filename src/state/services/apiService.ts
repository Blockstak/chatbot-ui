import { getToken } from "@/utils/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
    prepareHeaders: (headers, { endpoint }) => {
      const token = getToken();

      if (endpoint?.includes("auth")) return headers;
      if (token) headers.set("authorization", `Bearer ${token}`);

      return headers;
    },
  }),

  tagTypes: ["Topics", "Files"],

  endpoints: () => ({}),
});

export const {} = rootApi;
