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

        updateAsset: mutation<Asset[], { id: string, body: FormData }>({
            query: ({ id, body }) => ({ url: `assets/update/${id}`, method: 'Put', body }),
            invalidatesTags: ["Assets"],
        }),

        createBulkAssets: mutation<Asset[], FormData>({
            query: (body) => ({ url: 'assets/bulk-upload', method: 'POST', body }),
            invalidatesTags: ["Assets"],
        }),

        assignAsset: mutation<Asset[], { id: string, userId: string }>({
            query: ({ id, userId }) => ({ url: `assets/assign/${id}`, method: 'PUT', body: { userId } }),
            invalidatesTags: ["Assets"],
        }),

        reportFault: mutation<Asset[], {
            assetId: string,
            reportedBy: string,
            notes: string
        }>({
            query: (body) => ({ url: `assets/report-fault`, method: 'POST', body }),
            invalidatesTags: ["Assets"],
        }),

        resolveFault: mutation<Asset[], {
            id: string,
            resolvedById: string,
            notes: string
        }>({
            query: ({ id, ...body }) => ({ url: `assets/faults/${id}/status`, method: 'PUT', body }),
            invalidatesTags: ["Assets"],
        }),

        retrieveAsset: mutation<Asset[], {
            assetId: string,
            retrievedById: string,
            notes: string
        }>({
            query: ({ assetId, ...body }) => ({ url: `assets/retrieve/${assetId}`, method: 'PUT', body }),
            invalidatesTags: ["Assets"],
        }),

    }),
});

export const { useCreateAssetMutation, useListAssetsQuery, useFindAssetQuery, useAssignAssetMutation,
    useCreateBulkAssetsMutation, useReportFaultMutation, useRetrieveAssetMutation, useResolveFaultMutation, useUpdateAssetMutation
} = assetsApi;
