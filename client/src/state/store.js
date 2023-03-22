import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "state";

const store = configureStore({
    reducer: {
        theme: authSlice,
    }
});

export default store;