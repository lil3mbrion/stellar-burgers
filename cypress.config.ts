import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000', 
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    defaultCommandTimeout: 10000,
    
    setupNodeEvents(on, config) {
      return config;
    },
  },
});