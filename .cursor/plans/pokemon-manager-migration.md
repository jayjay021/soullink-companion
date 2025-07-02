# Pokemon Manager Migration Plan

## Goal
Migrate the Next.js-based PokemonManager and all its dependencies into the new codebase, updating API calls to use RTK Query hooks and using the shared pokemon-utils package for validation and move logic. Place all migrated code in a new folder (`components/pokemon/manager/`).

## Steps

- [ ] Create `components/pokemon/manager/` folder for migrated components
- [ ] Copy and adapt the following components from `pokemon-bak`:
  - [ ] `pokemon-manager.tsx`
  - [ ] `pokemon-grid.tsx`
  - [ ] `pokemon-tooltip.tsx`
  - [ ] `pokemon-wrapper.tsx`
  - [ ] `add-pokemon-modal.tsx`
  - [ ] `pokemon-autocomplete.tsx`
  - [ ] `use-pokemon-actions.ts`
- [ ] Replace all API calls (fetch, React Query) with RTK Query hooks from the generated API client
- [ ] Replace all validation and move logic with functions from the shared `pokemon-utils` package
- [ ] Update all type imports to use the generated types from the new API client
- [ ] Update any context usage (user/session) to use the current app's context/hooks
- [ ] Integrate the new `PokemonManager` into `SessionDetailPage`, replacing the old implementation
- [ ] Remove the old `PokemonManagement` and `pokemon-bak` folder after migration is complete and tested

## Notes
- Ensure all drag & drop and modal logic is preserved, but use new API and utils
- Keep styling consistent with the rest of the app
- Test all features (add, move, mark as dead, etc.) after migration 