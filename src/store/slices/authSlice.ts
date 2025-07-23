import { createSlice } from '@reduxjs/toolkit';
import type { AuthState } from '../../api/data/auth';

export const AUTH_STORAGE_KEY = 'miro.lms.AUTH';
const json = localStorage.getItem(AUTH_STORAGE_KEY);
const initialState: AuthState | null = json ? JSON.parse(json) : null;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (_, a: { payload: AuthState }) => a.payload,
        clearAuth: () => null,
    },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
