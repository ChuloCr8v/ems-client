import { baseApi } from '../base';
import type { Levels } from '../types';


export const levelsApi = baseApi.injectEndpoints({
    endpoints: ({ mutation, query }) => ({

        createLevel: mutation<void, FormData>({
            query: body => ({ url: 'invite/send', method: 'POST', body }),
            invalidatesTags: ["Levels"],
        }),

        listLevels: query<Levels[], void>({
            query: () => ({ url: `level` }),
            providesTags: ["Levels"],
        }),


    }),

});

export const { useListLevelsQuery } = levelsApi;
