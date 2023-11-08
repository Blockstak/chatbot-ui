import { rootApi } from "@/state/services/apiService";

import {
  LoginRespose,
  LoginFormData,
  VerifyTokenData,
  ProfileResponse,
  RegisterResponse,
  RegisterFormData,
  RefreshTokenData,
  RefreshTokenResponse,
} from "./types";

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterFormData>({
      query: (payload) => ({
        url: `/accounts/register/`,
        method: "POST",
        body: payload,
      }),
    }),

    login: builder.mutation<LoginRespose, LoginFormData>({
      query: (payload) => ({
        url: `/accounts/api/token/`,
        method: "POST",
        body: payload,
      }),
    }),

    verify: builder.mutation<void, VerifyTokenData>({
      query: (payload) => ({
        url: `/accounts/api/token/verify/`,
        method: "POST",
        body: payload,
      }),
    }),

    refresh: builder.mutation<RefreshTokenResponse, RefreshTokenData>({
      query: (payload) => ({
        url: `/accounts/api/token/refresh/`,
        method: "POST",
        body: payload,
      }),
    }),

    profile: builder.query<ProfileResponse, void>({
      query: () => ({ url: `/accounts/user-profile/` }),
    }),
  }),
});

export const {
  useProfileQuery,
  useLoginMutation,
  useVerifyMutation,
  useRefreshMutation,
  useRegisterMutation,
} = authApi;
