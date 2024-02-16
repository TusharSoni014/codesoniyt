import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CompilerSliceStateType } from "./compilerSlice";
import {
  codeType,
  loginCredentialsType,
  signupCredentialsType,
  userInfoType,
} from "@/vite-env";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
  }),
  tagTypes: ["myCodes", "allCodes"],
  endpoints: (builder) => ({
    saveCode: builder.mutation<{ url: string; status: string }, codeType>({
      query: (fullCode) => {
        return {
          url: "/compiler/save",
          method: "POST",
          body: fullCode,
        };
      },
      invalidatesTags: ["myCodes", "allCodes"],
    }),
    loadCode: builder.mutation<
      { fullCode: CompilerSliceStateType["fullCode"]; isOwner: boolean },
      { urlId: string }
    >({
      query: (body) => ({
        url: "/compiler/load",
        method: "POST",
        body: body,
      }),
    }),
    login: builder.mutation<userInfoType, loginCredentialsType>({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body: body,
        credentials: "include",
      }),
    }),
    signup: builder.mutation<userInfoType, signupCredentialsType>({
      query: (body) => ({
        url: "/user/signup",
        method: "POST",
        body: body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),
    getUserDetails: builder.query<userInfoType, void>({
      query: () => ({ url: "/user/user-details", cache: "no-store" }),
    }),
    getMyCodes: builder.query<Array<codeType>, void>({
      query: () => "/user/my-codes",
      providesTags: ["myCodes"],
    }),
    deleteCode: builder.mutation<void, string>({
      query: (_id) => ({
        url: `/compiler/delete/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["myCodes","allCodes"],
    }),
    editCode: builder.mutation<
      void,
      { fullCode: CompilerSliceStateType["fullCode"]; id: string }
    >({
      query: ({ fullCode, id }) => {
        return {
          url: `/compiler/edit/${id}`,
          method: "PUT",
          body: fullCode,
        };
      },
    }),
    getAllCodes: builder.query<
      Array<{ _id: string; title: string; ownerName: string }>,
      void
    >({
      query: () => ({
        url: "/compiler/get-all-codes",
        cache: "no-store",
      }),
      providesTags: ["allCodes"],
    }),
  }),
});

export const {
  useSaveCodeMutation,
  useLoadCodeMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserDetailsQuery,
  useSignupMutation,
  useGetMyCodesQuery,
  useDeleteCodeMutation,
  useEditCodeMutation,
  useGetAllCodesQuery,
} = api;
