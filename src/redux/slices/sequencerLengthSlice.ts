import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TotalBars {
  length: number;
}

interface SetState {
  value: number;
}

const initialState: TotalBars = { length: 50 };

export const sequencerLengthSlice = createSlice({
  name: "Sequencer length",
  initialState,
  reducers: {
    changeLength: (state, action: PayloadAction<SetState>) => {
      state.length = action.payload.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeLength } = sequencerLengthSlice.actions;

export default sequencerLengthSlice.reducer;
