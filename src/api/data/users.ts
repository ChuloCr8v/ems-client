import { baseApi } from '../base';
import type { AuthUser, User } from '../types';


export const usersApi = baseApi.injectEndpoints({
    endpoints: ({ query }) => ({

        listUsers: query<User[], void>({
            query: () => ({ url: `users` }),
            providesTags: ["User", "Invitations"],
        }),
        getMe: query<AuthUser, void>({
            query: () => 'auth/user',
            providesTags: ["User", "Invitations"],
        }),

    }),

});

export const { useListUsersQuery, useGetMeQuery } = usersApi;
