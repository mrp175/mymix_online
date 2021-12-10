import { configureStore, createSlice } from "@reduxjs/toolkit";
import waveformPositionReducer from "./waveformPositionReducer";

export const store = configureStore({
  reducer: {
    waveformPosition: waveformPositionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
