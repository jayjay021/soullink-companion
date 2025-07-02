# RTK Query Migration Plan

## Overview
This plan outlines the migration from TanStack Query to RTK Query with OpenAPI generator integration for the SoulLink Companion application.

## Current State Analysis

### Existing TanStack Query Implementation
- **Location**: `apps/frontend/src/hooks/useApi.ts`
- **Version**: TanStack Query v5.59.16
- **Features Used**:
  - `useQuery` for data fetching
  - `useMutation` for data mutations
  - `useQueryClient` for cache invalidation
  - Custom query keys and invalidation logic
  - Error handling and retry logic

### Current API Structure
- **OpenAPI Spec**: `packages/api-spec/specs/openapi.yaml`
- **Generated Types**: `packages/api-spec/generated/types.ts`
- **API Endpoints**:
  - Health check (`/health`)
  - Users (`/users`, `/users/{userId}`)
  - Sessions (`/session`, `/session/{sessionId}`)
  - Pokemon (`/pokemon/{sessionId}`, `/pokemon/{sessionId}/{pokemonId}`)
  - Pokedex (`/pokedex/pokemon`)

## Migration Strategy

### Phase 1: Setup RTK Query Infrastructure

#### 1.1 Install Dependencies
```bash
pnpm --filter frontend add @reduxjs/toolkit react-redux
pnpm --filter frontend remove @tanstack/react-query @tanstack/react-query-devtools
```

#### 1.2 Install OpenAPI Generator
```bash
pnpm --filter api-spec add -D @rtk-query/codegen-openapi
```

#### 1.3 Update API Spec Package
- Modify `packages/api-spec/package.json` to include RTK Query generation
- Add RTK Query generation script alongside existing Zod generation
- Configure OpenAPI generator to include proper tags for cache invalidation

#### 1.4 Create Redux Store
- Create `apps/frontend/src/store/index.ts`
- Configure RTK Query store with proper middleware
- Set up provider in main app entry point

### Phase 2: Generate RTK Query API

#### 2.1 Configure OpenAPI Generator
- Update `packages/api-spec/package.json` scripts
- Configure generator to output to `packages/api-spec/generated/rtk-query/`
- Set up proper tag-based cache invalidation
- Generate TypeScript types from OpenAPI spec

#### 2.2 Generate API Client
```bash
pnpm --filter api-spec generate:rtk-query
```

#### 2.3 Update Package Exports
- Add RTK Query exports to `packages/api-spec/package.json`
- Update `packages/api-spec/index.js` and `index.d.ts`

### Phase 3: Replace TanStack Query Implementation

#### 3.1 Update Main App Entry
- Replace `QueryClientProvider` with `Provider` from react-redux
- Remove `ReactQueryDevtools`
- Add Redux DevTools if needed

#### 3.2 Migrate API Hooks
- Replace `apps/frontend/src/hooks/useApi.ts` with RTK Query hooks
- Update all components using TanStack Query hooks
- Ensure proper error handling and loading states

#### 3.3 Update Components
Files to update:
- `apps/frontend/src/contexts/AuthContext.tsx`
- `apps/frontend/src/pages/PokedexPage.tsx`
- `apps/frontend/src/pages/SessionDetailPage.tsx`
- All other components using `useApi` hooks

### Phase 4: Cleanup and Optimization

#### 4.1 Remove TanStack Query Dependencies
- Remove `@tanstack/react-query` and `@tanstack/react-query-devtools`
- Remove `apps/frontend/src/lib/query-client.ts`
- Clean up any remaining TanStack Query imports

#### 4.2 Optimize RTK Query Configuration
- Configure proper cache time and stale time
- Set up optimistic updates where beneficial
- Configure proper error handling and retry logic

#### 4.3 Update Documentation
- Update README with new RTK Query setup
- Document new API hook usage patterns

## Implementation Details

### RTK Query Configuration
```typescript
// Example RTK Query setup
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => {
      // Add auth headers if needed
      return headers
    }
  }),
  tagTypes: ['User', 'Session', 'Pokemon', 'Pokedex'],
  endpoints: (builder) => ({
    // Generated endpoints will go here
  })
})
```

### OpenAPI Generator Configuration
```yaml
# rtk-query-codegen.yaml
schemaFile: './specs/openapi.yaml'
apiFile: './generated/rtk-query/api.ts'
outputFile: './generated/rtk-query/generated.ts'
hooks: true
tag: true
```

### Cache Invalidation Strategy
- **Users**: Invalidate on user creation/update
- **Sessions**: Invalidate on session CRUD operations
- **Pokemon**: Invalidate on pokemon CRUD operations
- **Pokedex**: Long cache time, rarely invalidated

## Benefits of Migration

### 1. Type Safety
- Full TypeScript support with generated types
- Compile-time validation of API contracts
- Automatic type inference for responses

### 2. Developer Experience
- Auto-generated hooks from OpenAPI spec
- Built-in cache management
- Automatic request deduplication
- Optimistic updates support

### 3. Performance
- Automatic request caching
- Background refetching
- Optimistic updates
- Request deduplication

### 4. Maintainability
- Single source of truth (OpenAPI spec)
- Generated code reduces manual maintenance
- Consistent API patterns across the app

## Risk Mitigation

### 1. Gradual Migration
- Migrate one endpoint at a time
- Keep both systems running during transition
- Comprehensive testing at each step

### 2. Backward Compatibility
- Maintain existing API interfaces during migration
- Ensure no breaking changes to component APIs
- Thorough testing of all affected components

### 3. Rollback Plan
- Keep TanStack Query code until migration is complete
- Version control for easy rollback
- Feature flags for gradual rollout

## Testing Strategy

### 1. Unit Tests
- Test generated RTK Query hooks
- Test cache invalidation logic
- Test error handling

### 2. Integration Tests
- Test API calls with mock server
- Test cache behavior
- Test optimistic updates

### 3. E2E Tests
- Test complete user flows
- Test error scenarios
- Test performance under load

## Timeline Estimate

- **Phase 1**: 1-2 days (Setup infrastructure)
- **Phase 2**: 1 day (Generate API client)
- **Phase 3**: 3-5 days (Migrate implementation)
- **Phase 4**: 1-2 days (Cleanup and optimization)

**Total**: 6-10 days

## Success Criteria

1. ✅ All existing functionality works with RTK Query
2. ✅ Performance is maintained or improved
3. ✅ Type safety is enhanced
4. ✅ Developer experience is improved
5. ✅ No breaking changes to component APIs
6. ✅ All tests pass
7. ✅ Documentation is updated

## Next Steps

1. Review and approve this migration plan
2. Set up development environment for RTK Query
3. Begin Phase 1 implementation
4. Create feature branch for migration
5. Set up testing infrastructure
6. Begin gradual migration of endpoints 