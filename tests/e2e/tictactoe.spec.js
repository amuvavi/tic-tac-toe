const { test, expect } = require('@playwright/test');

test.describe('Tic Tac Toe App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display X after the first click', async ({ page }) => {
    await page.click('[data-index="0"]');
    await expect(page.locator('[data-index="0"]')).toHaveText('X');
  });

  test('should alternate between X and O after each turn', async ({ page }) => {
    await page.click('[data-index="0"]');
    await page.click('[data-index="1"]');
    await expect(page.locator('[data-index="0"]')).toHaveText('X');
    await expect(page.locator('[data-index="1"]')).toHaveText('O');
  });

  test('should display message when X wins', async ({ page }) => {
    await page.click('[data-index="0"]'); // X
    await page.click('[data-index="3"]'); // O
    await page.click('[data-index="1"]'); // X
    await page.click('[data-index="4"]'); // O
    await page.click('[data-index="2"]'); // X
    await expect(page.locator('#message')).toHaveText('Player X wins!');
  });

  test('should display message when O wins', async ({ page }) => {
    await page.click('[data-index="0"]'); // X
    await page.click('[data-index="3"]'); // O
    await page.click('[data-index="1"]'); // X
    await page.click('[data-index="4"]'); // O
    await page.click('[data-index="8"]'); // X
    await page.click('[data-index="5"]'); // O
    await expect(page.locator('#message')).toHaveText('Player O wins!');
  });

  test('should display message when the game ends in a tie', async ({ page }) => {
    await page.click('[data-index="0"]'); // X
    await page.click('[data-index="1"]'); // O
    await page.click('[data-index="2"]'); // X
    await page.click('[data-index="4"]'); // O
    await page.click('[data-index="3"]'); // X
    await page.click('[data-index="5"]'); // O
    await page.click('[data-index="7"]'); // X
    await page.click('[data-index="6"]'); // O
    await page.click('[data-index="8"]'); // X
    await expect(page.locator('#message')).toHaveText('It\'s a tie!');
  });

  test('should reset the game when the "Reset" button is clicked', async ({ page }) => {
    await page.click('[data-index="0"]'); // X
    await page.click('[data-index="3"]'); // O
    await page.click('[data-index="1"]'); // X
    await page.click('[data-index="4"]'); // O
    await page.click('[data-index="2"]'); // X
    await page.click('#reset');
    await expect(page.locator('[data-index="0"]')).toHaveText('');
    await expect(page.locator('[data-index="1"]')).toHaveText('');
    await expect(page.locator('[data-index="2"]')).toHaveText('');
    await expect(page.locator('[data-index="3"]')).toHaveText('');
    await expect(page.locator('[data-index="4"]')).toHaveText('');
    await expect(page.locator('[data-index="5"]')).toHaveText('');
    await expect(page.locator('[data-index="6"]')).toHaveText('');
    await expect(page.locator('[data-index="7"]')).toHaveText('');
    await expect(page.locator('[data-index="8"]')).toHaveText('');
    await expect(page.locator('#message')).toHaveText('');
  });
});
