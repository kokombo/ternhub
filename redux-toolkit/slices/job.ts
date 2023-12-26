import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  allJobs: JobType[];
  userSavedJobs: JobType[];
};

const initialState: InitialStateType = {
  allJobs: [],
  userSavedJobs: [],
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },

    setUserSavedJobs: (state, action) => {
      state.userSavedJobs = action.payload;
    },
  },
});

export const { setAllJobs, setUserSavedJobs } = jobSlice.actions;
export default jobSlice.reducer;
