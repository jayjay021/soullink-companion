# OpenAPI Mapper Refactor Plan

## Overview
This plan outlines the refactoring of the API to use a proper mapper architecture with OpenAPI-generated types and Zod schemas for type safety.

## Phase 1: Update OpenAPI Spec ✅
- [x] Add reusable `UserRef` schema for minimal user objects (id + username)
- [x] Add reusable `User` schema for full user objects (id + username + createdAt)
- [x] Update `Session` schemas to use `UserRef` for users array
- [x] Update `Pokemon` schemas to include `UserRef` instead of `userId` string
- [x] Add `additionalProperties: false` to all schemas for strict validation
- [x] Migrate all inline response/request object types to dedicated named schemas
- [x] Regenerate types and Zod schemas

## Phase 2: Create Mapper Architecture ✅
- [x] Create base mapper interface and utilities
- [x] Create `SessionMapper` with methods to map Prisma objects to DTOs
- [x] Create `UserMapper` with methods to map Prisma objects to DTOs
- [x] Create `PokemonMapper` with methods to map Prisma objects to DTOs
- [x] Create `PokedexMapper` with methods to map raw data to DTOs
- [x] Use Zod schema types (`z.infer<typeof schemas.SchemaName>`) throughout

## Phase 3: Update Services ✅
- [x] Update `SessionService` to use mappers and Zod schema types
- [x] Update `UserService` to use mappers and Zod schema types
- [x] Update `PokemonService` to use mappers and Zod schema types
- [x] Update `PokedexService` to use mappers and Zod schema types
- [x] Remove inline mapping functions and paths types
- [x] Update Prisma queries to include user data where needed

## Phase 4: Update Tests, Validation, Frontend, and Final Testing ✅
- [x] Update all test files to use Zod schema types instead of paths types
- [x] Ensure strict validation that disallows additional properties
- [x] Update validation middleware to use strict validation by default
- [x] Update frontend to use RTK Query with OpenAPI generator
- [x] Run comprehensive tests to ensure everything works correctly
- [x] Fix any remaining type mismatches or validation issues

## Summary
All phases have been completed successfully! The API now uses:
- ✅ Proper mapper architecture with consistent user mapping
- ✅ OpenAPI-generated types and Zod schemas throughout
- ✅ Strict validation that disallows additional properties
- ✅ All tests passing with proper type safety
- ✅ Clean separation between Prisma objects and API DTOs