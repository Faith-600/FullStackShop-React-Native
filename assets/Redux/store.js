import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";
import thunk from "redux-thunk";

const store = configureStore({
    reducer: {
        cart: CartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
