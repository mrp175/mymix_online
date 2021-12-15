import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ZoomLevelState {
  zoomLevel: number;
}

const initialState: ZoomLevelState = { zoomLevel: 128 };

export const zoomLevelStateSlice = createSlice({
  name: "Zoom Level",
  initialState,
  reducers: {
    setZoomLevel: (state, action: PayloadAction<number>) => {
      state.zoomLevel = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setZoomLevel } = zoomLevelStateSlice.actions;

export default zoomLevelStateSlice.reducer;
