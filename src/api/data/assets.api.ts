import { baseApi } from '../base';
import type { Asset } from '../types';



export const assetsApi = baseApi.injectEndpoints({
    endpoints: ({ query, mutation }) => ({

        listAssets: query<Asset[], void>({
            query: () => ({ url: 'assets' }),
            providesTags: ["Assets"],
        }),

        findAsset: query<Asset, string>({
            query: (id) => ({ url: `assets/${id}` }),
            providesTags: ["Assets"],
        }),

        createAsset: mutation<Asset[], FormData>({
            query: (body) => ({ url: 'assets', method: 'POST', body }),
            invalidatesTags: ["Assets"],
        }),


    }),
});

export const { useCreateAssetMutation, useListAssetsQuery, useFindAssetQuery } = assetsApi;
