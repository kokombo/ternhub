import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  modalVisible: boolean;
};

const initialState: InitialStateType = {
  modalVisible: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload;
    },
  },
});

export const { setModalVisible } = modalSlice.actions;
export default modalSlice.reducer;
