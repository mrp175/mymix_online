import { configureStore } from "@reduxjs/toolkit";
import waveformStateReducer from "./slices/waveformStateSlice";
import waveformIdsReducer from "./slices/waveformIdsSlice";
import zoomLevelReducer from "./slices/zoomLevelSlice";
import sequencerLengthSlice from "./slices/sequencerLengthSlice";
import scrollPositionSlice from "./slices/scrollPositionSlice";

export const store = configureStore({
  reducer: {
    waveformStates: waveformStateReducer,
    waveformIds: waveformIdsReducer,
    zoomLevel: zoomLevelReducer,
    sequencerLength: sequencerLengthSlice,
    scrollPosition: scrollPositionSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
