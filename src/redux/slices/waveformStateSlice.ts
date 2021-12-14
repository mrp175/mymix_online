import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WaveformState {
  position: number;
  startOffset: number;
  gain: number;
}

export interface WaveformStates {
  [key: string]: WaveformState;
}

interface SetState {
  id: string;
  value: number;
}

const initialState: WaveformStates = {};

export const waveformStatesSlice = createSlice({
  name: "waveform position",
  initialState,
  reducers: {
    addWaveform: (state, action: PayloadAction<SetState>) => {
      state[action.payload.id] = {
        position: action.payload.value,
        startOffset: 0,
        gain: 0,
      };
    },
    setPosition: (state, action: PayloadAction<SetState>) => {
      state[action.payload.id].position = action.payload.value;
    },
    setStartOffset: (state, action: PayloadAction<SetState>) => {
      state[action.payload.id].startOffset = action.payload.value;
    },
    setGain: (state, action: PayloadAction<SetState>) => {
      state[action.payload.id].gain = action.payload.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addWaveform, setPosition, setStartOffset, setGain } =
  waveformStatesSlice.actions;

export default waveformStatesSlice.reducer;
