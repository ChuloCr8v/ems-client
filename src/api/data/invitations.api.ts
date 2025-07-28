import { baseApi } from '../base';
import type { Invite } from '../types';


export const invitationsApi = baseApi.injectEndpoints({
    endpoints: ({ mutation }) => ({

        sendInvitation: mutation<void, Invite>({
            query: body => ({ url: 'invite/send', method: 'POST', body }),
            invalidatesTags: ["Invitations"],
        }),


    }),
});

export const { useSendInvitationMutation } = invitationsApi;
