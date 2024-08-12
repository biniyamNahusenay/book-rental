import { apiSlice } from "./apiSlice"
import { BOOKS_URL } from "../constants"

export const booksApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
    getAllBooks: builder.query({
        query: () => ({
          url: `${BOOKS_URL}/allbooks`,
        }),
      }),
      getAllOwnersBook:builder.query({
        query:()=>({
          url:`${BOOKS_URL}/allOwnerbooks`
        })
      }),
      createBook:builder.mutation({
        query:(data)=>({
          url:`${BOOKS_URL}/upload`,
          method:'POST',
          body:data
        })
      })
    })
})

export const {useGetAllBooksQuery,useGetAllOwnersBookQuery,useCreateBookMutation} = booksApiSlice