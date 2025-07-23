import { createListenerMiddleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { setAuth, clearAuth, AUTH_STORAGE_KEY } from './authSlice';
import type { AuthState } from '../../api/data/auth';

export const authListener = createListenerMiddleware<{ auth: AuthState | null }>();

authListener.startListening({
    actionCreator: setAuth,
    effect: ({ payload }) => {
        console.log('auth payload', payload);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
    },
});

authListener.startListening({
    actionCreator: clearAuth,
    effect: () => localStorage.removeItem(AUTH_STORAGE_KEY),
});

authListener.startListening({
    predicate: isRejectedWithValue,
    effect(action, api) {
        const state = api.getState() as { auth: AuthState | null };
        const authToken = state.auth?.access_token;
        const authPayload = action.payload as { status: number };
        const errorStatus = authPayload?.status;

        if (errorStatus === 401 && authToken) {
            api.dispatch(clearAuth());
        }
    },
});
