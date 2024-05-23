
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  use: {
    headless: true,
    baseURL: 'http://127.0.0.1:5173',
  },
});
