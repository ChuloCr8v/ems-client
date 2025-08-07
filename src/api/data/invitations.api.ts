import { baseApi } from '../base';
import type { InvitationResponse, Prospect } from '../types';


export const invitationsApi = baseApi.injectEndpoints({
    endpoints: ({ mutation, query }) => ({

        sendInvitation: mutation<void, FormData>({
            query: body => ({ url: 'invite/send', method: 'POST', body }),
            invalidatesTags: ["User", "Invitations"],
        }),

        listInvitation: query<InvitationResponse, void>({
            query: () => ({ url: `invite` }),
            providesTags: ["User", "Invitations"],
        }),

        getInvite: query<Prospect, string>({
            query: (id) => ({ url: `invite/${id}` }),
            providesTags: ["User", "Invitations"],
        }),

        acceptOffer: mutation<InvitationResponse, string>({
            query: (token) => ({ url: `invite/accept/${token}`, method: "PUT" }),
            invalidatesTags: ["User", "Invitations"],
        }),

        submitProspectData: mutation<void, any>({
            query: ({ id, ...data }) => ({ url: `/users/invite/${id}`, method: "POST", body: data }),
            invalidatesTags: ["User", "Invitations"],
        }),

        approveProspect: mutation<void, any>({
            query: ({ id, ...data }) => ({ url: `/users/approve/${id}`, method: "PUT", body: data }),
            invalidatesTags: ["User", "Invitations"],
        }),
    }),

});

export const { useSendInvitationMutation, useListInvitationQuery, useAcceptOfferMutation, useGetInviteQuery, useSubmitProspectDataMutation, useApproveProspectMutation } = invitationsApi;
