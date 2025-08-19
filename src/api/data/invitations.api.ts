import { baseApi } from '../base';
import type { Invite, Prospect } from '../types';


export const invitationsApi = baseApi.injectEndpoints({
    endpoints: ({ mutation, query }) => ({

        sendInvitation: mutation<void, FormData>({
            query: body => ({ url: 'invite/send', method: 'POST', body }),
            invalidatesTags: ["User", "Invitations"],
        }),

        listInvitation: query<Prospect[], void>({
            query: () => ({ url: `invite` }),
            providesTags: ["User", "Invitations"],
        }),

        getInvite: query<Prospect, string>({
            query: (id) => ({ url: `invite/${id}` }),
            providesTags: ["User", "Invitations"],
        }),

        getInviteByToken: query<Invite, string>({
            query: (token) => ({
                url: `invite/prospect/${token}`,
                method: "GET",
            }),
            providesTags: ["User", "Invitations"],
        }),

        acceptOffer: mutation<Prospect, string>({
            query: (token) => ({ url: `invite/accept/${token}`, method: "PUT" }),
            invalidatesTags: ["User", "Invitations"],
        }),

        declineOffer: mutation<void, { token: string, reasons: Array<string> }>({
            query: ({ token, reasons }) => ({
                url: `invite/decline/${token}`, method: "PUT",
                body: reasons
            }),
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

export const { useSendInvitationMutation, useListInvitationQuery, useAcceptOfferMutation, useGetInviteQuery, useSubmitProspectDataMutation, useApproveProspectMutation, useGetInviteByTokenQuery, useDeclineOfferMutation } = invitationsApi;
