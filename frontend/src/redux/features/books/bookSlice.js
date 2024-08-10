import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name:'books',
    initialState:{
        booksFilter:{
            category:[],
            author:'',
            ownerId:'',
            location:''
        },
        filteredBooks:[]
    },
    reducers:{
        setBooksFilter:(state,action)=>{
            state.booksFilter={...state.booksFilter,...action.payload}
        },
        setFilteredBooks: (state, action) => {
            state.filteredBooks = action.payload;
         },
    }
})

export const {
    setBooksFilter,
    setFilteredBooks,
  } = bookSlice.actions;
  
  export default bookSlice.reducer;