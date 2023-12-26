import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  jobSearchTerm: string;
};

const initialState: InitialStateType = {
  jobSearchTerm: "",
};

const searchSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobSearchTerm: (state, action) => {
      state.jobSearchTerm = action.payload;
    },
  },
});

export const { setJobSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
