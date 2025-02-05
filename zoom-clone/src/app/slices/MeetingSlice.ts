import { createSlice } from "@reduxjs/toolkit";
import { ToastType } from "../../util/Types";

interface meetingInitialState {
  toasts: Array<ToastType>;
}

const initialState: meetingInitialState = {
  toasts: [],
};

export const meetingSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {
    setToasts: (state, action) => {
      state.toasts = action.payload;
    },
  },
});

export const { setToasts } = meetingSlice.actions;
