import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BarNumberDataState {
  count: number;
  currentPos: number;
}

interface State {
  loaded: boolean;
  value: BarNumberDataState[][];
}

const initialState: State = { value: [], loaded: false };

export const barNumberDataSlice = createSlice({
  name: "Bar Number Data",
  initialState,
  reducers: {
    setBarNumberData: (
      state,
      action: PayloadAction<BarNumberDataState[][]>
    ) => {
      state.value = action.payload;
    },
    setLoaded: (state) => {
      state.loaded = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBarNumberData, setLoaded } = barNumberDataSlice.actions;

export default barNumberDataSlice.reducer;
