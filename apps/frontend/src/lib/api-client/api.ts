import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5001/api/v1',
    prepareHeaders: (headers) => {
      // Add any auth headers here if needed
      // headers.set('Authorization', `Bearer ${token}`)
      return headers
    }
  }),
  tagTypes: ['User', 'Session', 'Pokemon', 'Pokedex', 'System'],
  endpoints: () => ({
    // Generated endpoints will be added here by the codegen
  })
})

// Export the api instance
export default api 