import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import notificationSlice from "./notificationSlice";
import termsSlice from "./termsSlice";

const store = configureStore({
    reducer: {
        terms: termsSlice.reducer,
        filter: filterSlice.reducer,
        notification: notificationSlice.reducer
    }
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store