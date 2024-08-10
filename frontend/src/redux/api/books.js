import { apiSlice } from "./apiSlice"
import { BOOKS_URL } from "../constants"

export const booksApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
    getAllBooks: builder.query({
        query: () => ({
          url: `${BOOKS_URL}/allbooks`,
        }),
      }),
    })
})

export const {useGetAllBooksQuery} = booksApiSlice