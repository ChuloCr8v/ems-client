import { baseApi } from '../base';
import type { User } from '../types';


export const usersApi = baseApi.injectEndpoints({
    endpoints: ({ query }) => ({



        listUsers: query<User[], void>({
            query: () => ({ url: `users` }),
            providesTags: ["User", "Invitations"],
        }),


    }),

});

export const { useLazyListUsersQuery } = usersApi;
