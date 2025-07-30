import { baseApi } from '../base';
import type { InvitationResponse } from '../types';


export const invitationsApi = baseApi.injectEndpoints({
    endpoints: ({ mutation, query }) => ({

        sendInvitation: mutation<void, FormData>({
            query: body => ({ url: 'invite/send', method: 'POST', body }),
            invalidatesTags: ["Invitations"],
        }),

        listInvitation: query<InvitationResponse, void>({
            query: () => ({ url: `invite/prospect` }),
            providesTags: ["Invitations"],
        }),

        acceptOffer: mutation<InvitationResponse, string>({
            query: (token) => ({ url: `invite/accept/${token}`, method: "PUT" }),
            invalidatesTags: ["Invitations"],
        }),


    }),

});

export const { useSendInvitationMutation, useListInvitationQuery, useAcceptOfferMutation } = invitationsApi;
