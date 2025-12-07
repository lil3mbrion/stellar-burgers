import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/cypress/'
  ],
  moduleNameMapper: {
    '^@utils-types$': '<rootDir>/src/utils/types',
    '^src/(.*)$': '<rootDir>/src/$1'
  }
};

export default config;