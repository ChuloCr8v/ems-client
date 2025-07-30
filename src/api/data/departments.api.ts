import { baseApi } from '../base';
import type { Department } from '../types';



export const deparmentsApi = baseApi.injectEndpoints({
    endpoints: ({ query }) => ({

        listDepartments: query<Department[], void>({
            query: () => ({ url: 'department' }),
            providesTags: ["Departments"],
        }),


    }),
});

export const { useListDepartmentsQuery } = deparmentsApi;
