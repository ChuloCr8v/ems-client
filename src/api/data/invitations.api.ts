import { baseApi } from '../base';
import type { InvitationResponse, Invite } from '../types';


export const invitationsApi = baseApi.injectEndpoints({
    endpoints: ({ mutation, query }) => ({

        sendInvitation: mutation<void, Invite>({
            query: body => ({ url: 'invite/send', method: 'POST', body }),
            invalidatesTags: ["Invitations"],
        }),

        listInvitation: query<InvitationResponse, void>({
            query: () => ({ url: `invite/prospect` }),
            providesTags: ["Invitations"],
        }),


    }),
});

export const { useSendInvitationMutation, useListInvitationQuery } = invitationsApi;
