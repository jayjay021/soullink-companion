/** @type {import('jest').Config} */
const config = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: [
    '<rootDir>/test/__fixtures__',
    '<rootDir>/node_modules',
    '<rootDir>/dist',
  ],
  moduleNameMapper: {
    '^@repo/logger$': '<rootDir>/../../packages/logger/src',
    '^@repo/pokemon-utils$': '<rootDir>/../../packages/pokemon-utils/src',
    '^@repo/api-spec/zod$': '<rootDir>/../../packages/api-spec/generated/zod/index.ts',
    '^@repo/api-spec/types$': '<rootDir>/../../packages/api-spec/generated/types.ts',
    '^@repo/api-spec$': '<rootDir>/../../packages/api-spec/index.js',
  },
  preset: 'ts-jest',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(@repo|.*\\.mjs$))',
  ],
  testEnvironment: 'node',
};

export default config;
