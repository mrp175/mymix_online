import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScrollPositionState {
  left: number;
  right: number;
}

interface SetState {
  left: number;
  right: number;
}

const initialState: ScrollPositionState = { left: 0, right: 0 };

export const scrollPositionSlice = createSlice({
  name: "Sroll Position",
  initialState,
  reducers: {
    setScrollPosition: (state, action: PayloadAction<SetState>) => {
      state.left = action.payload.left;
      state.right = action.payload.right;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setScrollPosition } = scrollPositionSlice.actions;

export default scrollPositionSlice.reducer;
