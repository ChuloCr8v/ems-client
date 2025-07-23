import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store/store';

export const paths = {
  User: 'users',
  Department: 'teams',
  Stage: 'stages',
  Level: 'levels',
  LeaveType: 'types',
  Entitlement: 'entitlements',
  Approver: 'approvers',
  Request: 'requests',
  Payroll: 'payroll',
  Payslip: 'payslip',
  Reports: 'reports',
  Report: 'report',
  Comments: 'comments',
} as const;

export type TagType = keyof typeof paths;

export const tagTypes = Object.keys(paths) as TagType[];

export const baseUrl = import.meta.env.VITE_API_URL;
// export const baseUrl = 'https://lms-dev.api.miro.zoracom.com';
// export const baseUrl = 'https://lms-dev.api.miro.zoracom.com';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth?.access_token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes,
  endpoints: () => ({}),
});
