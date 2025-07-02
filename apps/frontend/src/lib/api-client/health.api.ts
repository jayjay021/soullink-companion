import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { HealthResponse } from './generated.api';

// Custom health API that uses /api/health instead of /api/v1/health
export const healthApi = createApi({
  reducerPath: 'healthApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5001',
    prepareHeaders: (headers) => {
      // Add any auth headers here if needed
      // headers.set('Authorization', `Bearer ${token}`)
      return headers
    }
  }),
  tagTypes: ['System'],
  endpoints: (build) => ({
    getHealth: build.query<HealthResponse, void>({
      query: () => ({ url: `/api/health` }),
      providesTags: ["System"],
    }),
  }),
});

export const { useGetHealthQuery } = healthApi; 