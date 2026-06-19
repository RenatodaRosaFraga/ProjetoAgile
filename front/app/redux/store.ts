import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import favoritosReducer from "./slices/favoritosSlice";


export const store = configureStore({
    reducer:{
        auth: authReducer,
        favoritos: favoritosReducer,
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
