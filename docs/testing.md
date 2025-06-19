# Testing Setup for SoulLink Companion

## Overview

This project includes comprehensive unit tests for the business logic in helper functions located in `/src/lib/`. The tests cover:

- **Pokemon Helpers**: Validation and position assignment logic
- **Position Helpers**: Pokemon position swapping and movement
- **Validation Helpers**: Access control and data validation
- **API Helpers**: Error handling and response creation

## Test Framework

- **Jest**: Testing framework with TypeScript support
- **Coverage**: Collects coverage for helper functions
- **Mocking**: Comprehensive mocking of external dependencies

## Running Tests

```bash
# Run all tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:coverage

# Run tests for CI (no watch, with coverage)
pnpm run test:ci
```

## Test Organization

```
src/lib/
├── __tests__/
│   ├── pokemon-helpers.test.ts
│   ├── position-helpers.test.ts
│   ├── validation-helpers.test.ts
│   └── api-helpers.test.ts
├── pokemon-helpers.ts
├── position-helpers.ts
├── validation-helpers.ts
└── api-helpers.ts
```

## Key Testing Patterns

### 1. Database Operations

- All Prisma operations are mocked
- Tests verify correct database queries and parameters
- Error handling is tested for database failures

### 2. Business Logic Validation

- Pokemon constraint validation (name/route uniqueness)
- Position assignment logic (team vs box)
- Access control and ownership validation

### 3. Error Handling

- Database connection failures
- Constraint violations
- Invalid input parameters
- Proper error logging and propagation

### 4. Logging

- All logger calls are mocked and verified
- Tests ensure proper logging context and messages
- Error logging includes relevant debugging information

## Coverage Goals

- **Minimum Coverage**: 80% for all helper functions
- **Critical Paths**: 100% coverage for error handling
- **Business Logic**: 95% coverage for validation functions

## Pre-commit Testing

Tests are automatically run on pre-commit hooks to ensure:

- All tests pass before commits
- Code coverage meets minimum thresholds
- Type checking passes
- Linting rules are followed

## Writing New Tests

When adding new helper functions:

1. Create a corresponding test file in `__tests__/`
2. Mock all external dependencies (Prisma, logger, etc.)
3. Test both success and error scenarios
4. Verify logging and error handling
5. Ensure coverage meets project standards

## Mock Patterns

### Prisma

```typescript
const mockPrisma = {
  pokemon: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};
```

### Logger

```typescript
const mockLogger = {
  child: jest.fn().mockReturnThis(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
};
```

### Transaction Client

```typescript
const mockTx = {
  pokemon: {
    update: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
};
```

## Best Practices

1. **Arrange-Act-Assert**: Structure tests clearly
2. **Descriptive Names**: Test names should describe the scenario
3. **Single Responsibility**: One assertion per test when possible
4. **Mock Reset**: Clear mocks between tests
5. **Error Scenarios**: Always test error paths
6. **Edge Cases**: Test boundary conditions and invalid inputs

This testing infrastructure ensures the reliability and maintainability of the business logic layer in the SoulLink Companion application.
