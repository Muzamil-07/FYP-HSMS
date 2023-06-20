import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseUrl = "http://localhost:3001/api/v1";

export const nodeAPI = createApi({
  reducerPath: "nodeAPI",
  baseQuery: fetchBaseQuery({ baseUrl }),

  // Entities of API
  tagTypes: [
  "User"
  ],

  endpoints: (builder) => ({

    getUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
        headers: { Authorization: `Bearer ${ Cookies.get( 'jwt' )}` }
      }),
    }),


  }),
});

export const {useGetUserQuery} = nodeAPI;
