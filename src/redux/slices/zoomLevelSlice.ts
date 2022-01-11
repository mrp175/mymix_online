import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ZoomLevelState {
  zoomLevel: number;
  mouseDown: boolean;
}

const initialState: ZoomLevelState = { zoomLevel: 30000, mouseDown: false };

export const zoomLevelStateSlice = createSlice({
  name: "Zoom Level",
  initialState,
  reducers: {
    setZoomLevel: (state, action: PayloadAction<number>) => {
      state.zoomLevel = action.payload;
    },
    setMouseDown: (state, action: PayloadAction<boolean>) => {
      state.mouseDown = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setZoomLevel, setMouseDown } = zoomLevelStateSlice.actions;

export default zoomLevelStateSlice.reducer;
