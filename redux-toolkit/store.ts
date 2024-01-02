import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/job";
import searchReducer from "./slices/search";
import modalReducer from "./slices/modal";
import blogReducer from "./slices/blog";

export const store = configureStore({
  reducer: {
    job: jobReducer,
    search: searchReducer,
    modal: modalReducer,
    blog: blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type StateType = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
