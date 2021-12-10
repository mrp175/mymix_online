import { createSlice } from "@reduxjs/toolkit";

export const waveformPositionSlice = createSlice({
  name: "waveform position",
  initialState: {
    position: 0,
  },
  reducers: {
    increment: (state) => {
      state.position += 10;
    },
    decrement: (state) => {
      state.position -= 10;
    },
    goToPosition: (state, action) => {
      state.position = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, goToPosition } =
  waveformPositionSlice.actions;

export default waveformPositionSlice.reducer;
