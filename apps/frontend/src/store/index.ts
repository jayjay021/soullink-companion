import { configureStore } from '@reduxjs/toolkit'
import { api } from '../lib/api-client/generated.api'
import { healthApi } from '../lib/api-client/health.api'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [healthApi.reducerPath]: healthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, healthApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 