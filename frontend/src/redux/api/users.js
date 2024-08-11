import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/register`,
                method:'POST',
                body:data,
            }),
        }),

       login:builder.mutation({
         query:(data)=>({
            url:`${USERS_URL}/login`,
            method:'POST',
            body:data
         }),
       }),
       logout: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/logout`,
          method: "POST",
        }),
      }),

      getAllUsers: builder.query({
        query: () => ({
          url: `${USERS_URL}/allUsers`,
        }),
      }),

      approveOwner: builder.mutation({
        query: ({ id, data }) => ({
          url: `${USERS_URL}/approve-owner/${id}`,
          method: "PATCH",
          body: data,
        }),
      }),

      getOwnersRevenue: builder.query({
        query: () => ({
          url: `${USERS_URL}/owners/revenue`,
        }),
      }),      

      disableUser: builder.mutation({
        query: ({ id, data }) => ({
          url: `${USERS_URL}/owner/${id}/disable`,
          method: "PATCH",
          body: data,
        }),
      }),

      filterBooks: builder.query({
        query: () => ({
          url: `${USERS_URL}/books/filter`,
        }),
      }),

      filterBookByLocation:builder.query({
        query: () => ({
          url: `${USERS_URL}/books/location`,
        }),
      }),

      getOwnerById:builder.query({
        query:({id})=>({
          url:`${USERS_URL}/owners/${id}`
        })
      })
    })
})

export const {useRegisterMutation,useLoginMutation,useGetAllUsersQuery,useGetOwnerByIdQuery,useApproveOwnerMutation} = userApiSlice