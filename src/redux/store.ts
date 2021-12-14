import { configureStore } from "@reduxjs/toolkit";
import waveformStateReducer from "./slices/waveformStateSlice";
import waveformIDsReducer from "./slices/waveformIDsSlice";

export const store = configureStore({
  reducer: {
    waveformStates: waveformStateReducer,
    waveformIDs: waveformIDsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
