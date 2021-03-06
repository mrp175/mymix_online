import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface WaveformState {
  position: number;
  startOffset: number;
  gain: number;
  mouseDown: boolean;
}

export interface WaveformStates {
  [key: string]: WaveformState;
}

interface SetState {
  id: string;
  value: number;
}

interface SetMouseState {
  id: string;
  value: boolean;
}

interface AddWaveform {
  id: string;
  startPosition: number;
}

const initialState: WaveformStates = {};

export const waveformStatesSlice = createSlice({
  name: "Waveform States",
  initialState,
  reducers: {
    addWaveform: (state, action: PayloadAction<AddWaveform>) => {
      state[action.payload.id] = {
        position: action.payload.startPosition,
        startOffset: 0,
        gain: 1,
        mouseDown: false,
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
    setMouseDown: (state, action: PayloadAction<SetMouseState>) => {
      state[action.payload.id].mouseDown = action.payload.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addWaveform,
  setPosition,
  setStartOffset,
  setGain,
  setMouseDown,
} = waveformStatesSlice.actions;

export const waveformStates = (state: RootState) => state.waveformStates;

export default waveformStatesSlice.reducer;
