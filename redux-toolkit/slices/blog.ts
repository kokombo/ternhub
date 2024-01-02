import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  allBlogs: BlogType[];
};

const initialState: InitialStateType = {
  allBlogs: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setAllBlogs: (state, action) => {
      state.allBlogs = action.payload;
    },
  },
});

export const { setAllBlogs } = blogSlice.actions;
export default blogSlice.reducer;
