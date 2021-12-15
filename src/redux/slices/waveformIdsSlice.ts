import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WaveformIds {
  [key: string]: boolean;
}

interface WaveformId {
  id: string;
}

const initialState: WaveformIds = {};

export const waveformIdsSlice = createSlice({
  name: "waveform IDs",
  initialState,
  reducers: {
    addId: (state, action: PayloadAction<WaveformId>) => {
      state[action.payload.id] = true;
    },
    removeId: (state, action: PayloadAction<WaveformId>) => {
      delete state[action.payload.id];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addId, removeId } = waveformIdsSlice.actions;

export default waveformIdsSlice.reducer;
