import { baseApi } from '../base';
import type { Department } from '../types';

type CreateDepartment = {
    name: string
    departmentHead?: string
    description?: string
    createdBy?: string
}

export const deparmentsApi = baseApi.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        listDepartments: query<Department[], void>({
            query: () => ({ url: 'department' }),
            providesTags: ["Departments"],
        }),

        getTeam: query<Department[], string>({
            query: (id) => ({ url: `department/team/${id}` }),
            providesTags: ["Departments"],
        }),

        findDepartment: query<Department, string>({
            query: (id) => ({ url: `departments/${id}` }),
            providesTags: ["Departments"],
        }),

        createDepartment: mutation<Department, CreateDepartment>({
            query: (body) => ({ url: 'department', method: 'POST', body }),
            invalidatesTags: ["Departments"],
        }),

    }),
});

export const { useListDepartmentsQuery, useCreateDepartmentMutation, useFindDepartmentQuery, useGetTeamQuery } = deparmentsApi;
