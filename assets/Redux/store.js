import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";

const store = configureStore({
    reducer: {
        cart: CartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
