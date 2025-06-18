# GitHub Copilot Instructions for SoulLink Companion

## Project Overview

This is a Next.js 15 TypeScript project using the App Router, Mantine UI components, Prisma ORM, TanStack Query, and Socket.IO for real-time features. The project follows modern React patterns and TypeScript best practices.

## Technology Stack

- **Framework**: Next.js 15.3.3 with App Router (⚠️ Next.js 15 is cutting-edge - follow React 19 patterns)
- **Language**: TypeScript ^5
- **UI Library**: Mantine v8.1.1 (Primary UI component library)
- **Database**: Prisma ORM ^6.9.0 with SQLite
- **State Management**: TanStack Query ^5.80.7 for server state
- **Real-time**: Socket.IO ^4.8.1
- **Styling**: CSS Modules + Mantine styling system
- **Package Manager**: pnpm
- **Runtime**: React ^19.0.0 + React DOM ^19.0.0

### Key Dependencies & Versions

```json
{
  "next": "15.3.3",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "@mantine/core": "^8.1.1",
  "@mantine/form": "^8.1.1",
  "@mantine/hooks": "^8.1.1",
  "@mantine/modals": "^8.1.1",
  "@mantine/notifications": "^8.1.1",
  "@tanstack/react-query": "^5.80.7",
  "@prisma/client": "^6.9.0",
  "prisma": "^6.9.0",
  "socket.io": "^4.8.1",
  "zod": "^3.25.67",
  "typescript": "^5"
}
```

⚠️ **IMPORTANT**: When updating or adding major dependencies, update this instruction file with new versions and any breaking changes or new patterns.

### Next.js 15 & React 19 Specifics

- **React 19**: Uses new JSX Transform, improved error boundaries, and concurrent features
- **App Router**: Stable in Next.js 15 - use server/client components appropriately
- **Turbopack**: Enabled by default in dev mode (`--turbopack` flag)
- **TypeScript 5**: Uses latest TypeScript features and stricter type checking
- **Server Components**: Default behavior - mark client components explicitly with `'use client'`

## Folder Structure & Best Practices

### Core Directories

#### `/src/app/` - Next.js App Router

- Use App Router conventions (layout.tsx, page.tsx, route.ts)
- API routes in `/api/` subdirectories
- Each route should have its own folder with descriptive names
- Client components should be in separate files with `.tsx` extension
- Server components are the default, mark client components with `'use client'`

#### `/src/components/` - Reusable Components

- **Structure**: Organized by feature/domain (pokemon, player, session, ui)
- **Index files**: Each folder has an `index.ts` for clean exports
- **Naming**: Use kebab-case for files, PascalCase for component names
- **Split components**: Create separate components when:
  - Component exceeds 150 lines
  - Logic can be reused elsewhere
  - Component has multiple responsibilities
  - Complex forms or modals need sub-components

```
components/
├── index.ts          # Re-exports all components
├── pokemon/
│   ├── index.ts      # Export all pokemon components
│   ├── pokemon-grid.tsx
│   ├── pokemon-autocomplete.tsx
│   └── add-pokemon-modal.tsx
├── player/
├── session/
└── ui/               # Generic/shared UI components
```

#### `/src/types/` - Type Definitions

- Keep API types in `api.ts`
- Generate TypeScript types for ALL API endpoints (request/response)
- Create domain-specific type files when needed
- Use Zod schemas for runtime validation
- Export types from index files for clean imports
- Ensure type safety across the entire API layer

```typescript
// Good: API types structure
export interface CreatePokemonRequest {
  name: string;
  level: number;
  sessionId: string;
}

export interface CreatePokemonResponse {
  id: string;
  name: string;
  level: number;
  sessionId: string;
  createdAt: string;
}

export interface ApiError {
  error: string;
  details?: unknown;
}
```

#### `/prisma/` - Database Schema & Migrations

- Schema definitions in `schema.prisma`
- Migrations are auto-generated
- Use descriptive migration names

## ⚠️ CRITICAL: Structure Validation & Enforcement

### MANDATORY: Always Check Existing Structure First

Before creating ANY new files, components, types, or hooks, you MUST:

1. **🔍 Check existing folders**: Use `list_dir` or `file_search` to examine current structure
2. **🧩 Check existing components**: Use `semantic_search` to find similar functionality
3. **📝 Check existing types**: Look in `/src/types/` before defining new interfaces
4. **🎣 Check existing contexts/hooks**: Look in `/src/app/context/` before creating state management
5. **📁 Follow domain organization**: Never create new folders in `/src/app/` for reusable code

### Structure-First Development Checklist

When asked to create components, ALWAYS follow this order:

- [ ] **FIRST**: Run `semantic_search` to find existing similar components
- [ ] **SECOND**: Check folder structure with `list_dir`
- [ ] **THIRD**: Use existing patterns, contexts, and utilities
- [ ] **FOURTH**: Place files in correct locations following established patterns
- [ ] **LAST**: Update appropriate `index.ts` files for exports

### Existing Context Usage Rules

#### UserContext - `/src/app/context/UserContext.tsx`

- **Use `useUser()` hook** for all user state needs
- **Contains**: `username`, `userId`, `isViewer`, `loading`, `setUsername`, `setUserId`, `setIsViewer`, `reloadUser`
- **NEVER** create duplicate user state management hooks or contexts
- **Check UserContext first** before creating any user-related functionality

```typescript
// ✅ CORRECT: Use existing UserContext
import { useUser } from '@/app/context/UserContext';

const MyComponent = () => {
  const { userId, username, isViewer, loading } = useUser();
  // ... use existing user state
};

// ❌ WRONG: Creating new user state management
const [userId, setUserId] = useState('');
const [username, setUsername] = useState('');
```

### File Location Rules - NO EXCEPTIONS

#### ✅ CORRECT Locations:

- **Reusable Components**: `/src/components/{domain}/component-name.tsx`
- **Types**: `/src/types/domain-name.ts` (exported via `/src/types/index.ts`)
- **Utilities/Hooks**: `/src/components/{domain}/use-hook-name.ts` (if domain-specific)
- **Context**: `/src/app/context/` (only for app-wide state)

#### ❌ NEVER Create:

- `/src/app/*/components/` folders
- `/src/app/*/types/` folders
- `/src/app/*/hooks/` folders
- `/src/app/*/utils/` folders
- New context when UserContext already exists

### Domain Organization

Components must be organized by domain:

```
/src/components/
├── pokemon/           # Pokemon-related components
│   ├── pokemon-grid.tsx
│   ├── pokemon-manager.tsx
│   └── index.ts
├── session/           # Session-related components
│   ├── session-header.tsx
│   ├── session-card.tsx
│   └── index.ts
├── player/            # Player-related components
├── ui/                # Generic/shared UI components
└── index.ts           # Re-exports all domains
```

### Import Validation

✅ **CORRECT Imports**:

```typescript
// External libraries first
import { Button } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

// Internal types
import type { SessionData } from '@/types';

// Internal components (via index exports)
import { SessionHeader, PokemonManager } from '@/components';

// Existing contexts
import { useUser } from '@/app/context/UserContext';
```

❌ **WRONG Imports**:

```typescript
// Don't import from nested app folders
import { SessionHeader } from '../components/SessionHeader';
import { useUserRole } from './hooks/useUserRole';

// Don't create relative imports to app folders
import { MyComponent } from '../../app/session/components/MyComponent';
```

### Enforcement Actions

If you catch yourself about to:

- Create folders in `/src/app/*/` for reusable code → **STOP** and use `/src/components/`
- Define new user state → **STOP** and check UserContext first
- Create new types → **STOP** and check `/src/types/` first
- Import from nested app paths → **STOP** and use proper index exports

**Remember**: The goal is maintainable, reusable, and properly organized code that follows established patterns.

## Component Development Guidelines

### 1. Always Use Mantine Components

- **Priority**: Use Mantine components first before creating custom UI
- **Common components**: Button, TextInput, Modal, Paper, Group, Stack, Grid, etc.
- **Styling**: Use Mantine's styling system (`style`, `className`, theme objects)
- **Icons**: Use Mantine's icon system or Tabler icons

```typescript
import { Button, Modal, TextInput, Group, Stack } from '@mantine/core';

// Good: Using Mantine components
const MyComponent = () => (
  <Modal opened={opened} onClose={close}>
    <Stack>
      <TextInput label="Name" placeholder="Enter name" />
      <Group justify="flex-end">
        <Button variant="outline" onClick={close}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </Group>
    </Stack>
  </Modal>
);
```

### 2. Component Splitting Guidelines

Split components when:

- **Size**: Component exceeds 150 lines
- **Reusability**: Logic/UI can be used elsewhere
- **Responsibility**: Component handles multiple concerns
- **Complexity**: Complex forms, modals, or data displays

```typescript
// Good: Split complex modal into sub-components
const AddPokemonModal = () => (
  <Modal opened={opened} onClose={close}>
    <PokemonSearchForm onSelect={handleSelect} />
    <PokemonPreview pokemon={selectedPokemon} />
    <ModalActions onSave={handleSave} onCancel={close} />
  </Modal>
);
```

### 3. Import Conventions

```typescript
// 1. External libraries
import React from 'react';
import { Button, Modal } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

// 2. Internal utilities/types
import { api } from '@/lib/api';
import type { Pokemon } from '@/types';

// 3. Internal components (use index exports)
import { PokemonGrid, AddPokemonModal } from '@/components';
```

### 4. State Management Patterns

- **Server State**: ALWAYS use TanStack Query for ALL API calls
- **Client State**: Use React hooks (useState, useReducer)
- **Global State**: Use React Context sparingly
- **Forms**: Use Mantine's form system or React Hook Form
- **NO Server Actions**: Avoid Next.js server actions for cleaner architecture

```typescript
// Good: TanStack Query for all API interactions
const {
  data: pokemon,
  isLoading,
  error,
} = useQuery({
  queryKey: ['pokemon', sessionId],
  queryFn: () => api.pokemon.getBySession(sessionId),
});

// Good: Mutations with TanStack Query
const addPokemonMutation = useMutation({
  mutationFn: (pokemon: CreatePokemonRequest) => api.pokemon.create(pokemon),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['pokemon'] });
  },
});

// Good: Mantine forms
const form = useForm({
  initialValues: { name: '', level: 1 },
  validate: {
    name: (value) => (!value ? 'Name is required' : null),
  },
});
```

## API Development Guidelines

### Route Structure

```
/api/
├── pokemon/
│   ├── route.ts              # GET /api/pokemon
│   ├── [sessionId]/
│   │   ├── route.ts          # GET /api/pokemon/[sessionId]
│   │   └── position/route.ts # PUT /api/pokemon/[sessionId]/position
└── session/
    ├── route.ts              # GET/POST /api/session
    └── [sessionId]/route.ts  # GET/PUT/DELETE /api/session/[sessionId]
```

### API Best Practices

- **HTTP Methods**: Use proper HTTP methods (GET, POST, PUT, DELETE)
- **Input Validation**: Validate input with Zod schemas
- **Type Safety**: Generate and use TypeScript types for ALL API requests/responses
- **Error Handling**: Handle errors consistently with proper status codes
- **Database**: Use Prisma for all database operations
- **NO Server Actions**: Use API routes instead of server actions for cleaner architecture
- **TanStack Query**: All client-side API calls MUST use TanStack Query

```typescript
// Good: Typed API route with Zod validation
import { z } from 'zod';
import type { CreatePokemonRequest, CreatePokemonResponse } from '@/types/api';

const createPokemonSchema = z.object({
  name: z.string().min(1),
  level: z.number().min(1).max(100),
  sessionId: z.string().uuid(),
});

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const validatedData = createPokemonSchema.parse(body);

    const pokemon = await prisma.pokemon.create({
      data: validatedData,
    });

    return Response.json(pokemon satisfies CreatePokemonResponse);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    return Response.json(
      { error: 'Failed to create pokemon' },
      { status: 500 }
    );
  }
}

// Good: Client-side usage with TanStack Query
const createPokemon = useMutation<
  CreatePokemonResponse,
  Error,
  CreatePokemonRequest
>({
  mutationFn: (data) => api.pokemon.create(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['pokemon'] });
  },
});
```

## File Naming Conventions

- **Components**: `kebab-case.tsx` (e.g., `pokemon-grid.tsx`)
- **Hooks**: `use-kebab-case.ts` (e.g., `use-pokemon-data.ts`)
- **Utils**: `kebab-case.ts` (e.g., `api-client.ts`)
- **Types**: `kebab-case.ts` (e.g., `pokemon-types.ts`)
- **CSS Modules**: `component-name.module.css`

## Code Quality Standards

- Use TypeScript strict mode
- Prefer functional components with hooks
- Use proper error boundaries
- Implement loading states
- Add proper TypeScript types for all props
- Use Prettier for formatting
- Use ESLint for code quality
- Follow Next.js performance best practices

## Testing Guidelines

- Write unit tests for utility functions
- Test components with React Testing Library
- Mock API calls in tests
- Test user interactions and edge cases

## Maintaining These Instructions

⚠️ **CRITICAL**: This instruction file must be updated when:

- Major dependencies are upgraded (Next.js, React, Mantine, TanStack Query, etc.)
- New architectural patterns are adopted
- Breaking changes require different approaches
- New libraries are added to the core stack

Keep dependency versions current and document any version-specific patterns or breaking changes.

Remember: Always prioritize Mantine components, split complex components into smaller reusable pieces, and maintain clean separation of concerns following the established folder structure.
