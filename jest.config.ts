import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './', // Provide the path to your Next.js app
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Remove the line below to avoid the error
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(config);
