import { baseApi } from './base';
import type { AuthUser, Id, JobType, User } from './types';

export type NewUser = {
  email: string;
  firstName: string;
  lastName: string;
  employeeId: number;
  teamId: Id;
  levelId: Id;
  jobTitle: string;
  jobType: JobType;
  isAdmin?: boolean;
};

export type ModifyUser = {
  id: string;
  firstName?: string;
  lastName?: string;
  employeeId?: number;
  email?: string;
  teamId?: Id;
  levelId?: Id;
};

const usersApi = baseApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getMe: query<AuthUser, void>({
      query: () => 'auth/user',
      providesTags: ['User', 'Approver'],
    }),

    listUsers: query<User[], void>({
      query: () => 'users',
      providesTags: ['User'],
    }),

    createUser: mutation<User, NewUser>({
      query: body => ({ url: 'users', method: 'POST', body }),
      invalidatesTags: ['User'],
    }),

    modifyUser: mutation<User, ModifyUser>({
      query: ({ id, ...body }) => ({ url: `users/${id}`, method: 'PATCH', body }),
      invalidatesTags: ['User'],
    }),

    deleteUser: mutation<void, Id>({
      query: id => ({ url: `users/${id}`, method: 'DELETE' }),
      invalidatesTags: ['User', 'Approver'],
    }),
  }),
});

export const {
  useGetMeQuery,
  useListUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useModifyUserMutation,
} = usersApi;
