import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './.',
  testMatch: '**/*.spec.js',
  fullyParallel: false,
  forbidOnly: false,
  retries: 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5500',
    trace: 'on-first-retry',
  },

  webServer: {
    command: 'python -m http.server 5500',
    url: 'http://localhost:5500',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
