import { rootApi } from "@/state/services/apiService";

import {
  LoginResponse,
  LoginFormData,
  VerifyTokenData,
  ProfileResponse,
  RegisterResponse,
  RegisterFormData,
  RefreshTokenData,
  RefreshTokenResponse,
  UpdateNameResponse,
  UpdateNameFormData,
  UpdatePasswordResponse,
  UpdatePasswordFormData,
  UpdatePhotoResponse,
  UpdatePhotoFormData,
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

    login: builder.mutation<LoginResponse, LoginFormData>({
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

    updatePhoto: builder.mutation<UpdatePhotoResponse, UpdatePhotoFormData>({
      query: (payload) => ({
        url: `/accounts/profile/update-photo/`,
        method: "PATCH",
        body: payload,
      }),
    }),

    updateName: builder.mutation<UpdateNameResponse, UpdateNameFormData>({
      query: (payload) => ({
        url: `/accounts/profile/update/`,
        method: "PUT",
        body: payload,
      }),
    }),

    updatePassword: builder.mutation<
      UpdatePasswordResponse,
      UpdatePasswordFormData
    >({
      query: (payload) => ({
        url: `/accounts/change-password/`,
        method: "POSt",
        body: payload,
      }),
    }),

    profile: builder.query<ProfileResponse, void>({
      // query: () => ({ url: `/accounts/user-profile/` }),
      query: () => ({ url: `/accounts/profile/` }),
    }),
  }),
});

export const {
  useProfileQuery,
  useLoginMutation,
  useVerifyMutation,
  useRefreshMutation,
  useRegisterMutation,
  useUpdateNameMutation,
  useUpdatePasswordMutation,
  useUpdatePhotoMutation,
} = authApi;
