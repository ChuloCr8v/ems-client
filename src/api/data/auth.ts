import { baseApi, tagTypes } from '../base';
import type { AuthUser } from '../types';

export type AuthState = {
    user: AuthUser;
    access_token: string;
};

export type LoginInput = {
    email: string;
    password: string;
};

export type MsLoginInput = {
    token: string;
};

export const authApi = baseApi.injectEndpoints({
    endpoints: ({ mutation }) => ({

        loginMicrosoft: mutation<AuthState, MsLoginInput>({
            query: body => ({ url: 'auth/azure', method: 'POST', body }),
            invalidatesTags: tagTypes, // login invalidates everything
        }),


    }),
});

export const { useLoginMicrosoftMutation } = authApi;
