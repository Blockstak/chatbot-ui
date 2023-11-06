import { rootApi } from "@/state/services/apiService";
import {
  LoginRespose,
  LoginFormData,
  SignupFormData,
  LogoutResponse,
} from "./types";

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<LoginRespose, SignupFormData>({
      query: (payload) => ({
        url: `/auth/signup`,
        method: "POST",
        body: payload,
      }),
    }),

    login: builder.mutation<LoginRespose, LoginFormData>({
      query: (payload) => ({
        url: `/auth/login`,
        method: "POST",
        body: payload,
      }),
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
    }),

    resetPassword: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useResetPasswordMutation,
} = authApi;
