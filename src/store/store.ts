import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { baseApi } from '../api/base';
import { authSlice } from './slices/authSlice';
import { authListener } from './slices/authListener';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: m => m().concat(baseApi.middleware, authListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch: () => AppDispatch = useDispatch;

setupListeners(store.dispatch);
