import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TotalBars {
  lengthBars: number;
  requiredLengthBars: number;
}

interface SetState {
  value: number;
}

const initialState: TotalBars = { lengthBars: 250, requiredLengthBars: 250 };

export const sequencerLengthSlice = createSlice({
  name: "Sequencer length",
  initialState,
  reducers: {
    setLength: (state, action: PayloadAction<SetState>) => {
      state.lengthBars = action.payload.value;
    },
    setRequiredLength: (state, action: PayloadAction<SetState>) => {
      state.requiredLengthBars = action.payload.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLength, setRequiredLength } = sequencerLengthSlice.actions;

export default sequencerLengthSlice.reducer;
