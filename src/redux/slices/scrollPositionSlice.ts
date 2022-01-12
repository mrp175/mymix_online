import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScrollPositionState {
  barsLeft: number;
  barsRight: number;
  pxLeft: number;
  pxRight: number;
}

interface SetState {
  barsLeft: number;
  barsRight: number;
  pxLeft: number;
  pxRight: number;
}

const initialState: ScrollPositionState = {
  barsLeft: 0,
  barsRight: 0,
  pxLeft: 0,
  pxRight: 0,
};

export const scrollPositionSlice = createSlice({
  name: "Scroll Position",
  initialState,
  reducers: {
    setScrollPosition: (state, action: PayloadAction<SetState>) => {
      state.barsLeft = action.payload.barsLeft;
      state.barsRight = action.payload.barsRight;
      state.pxLeft = action.payload.pxLeft;
      state.pxRight = action.payload.pxRight;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setScrollPosition } = scrollPositionSlice.actions;

export default scrollPositionSlice.reducer;
