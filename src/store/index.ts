import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { authListener } from './slices/authListener';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(authListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
