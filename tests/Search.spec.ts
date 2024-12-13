import { test, expect } from '@playwright/test';

const BASE_URL = 'https://onlinelibrary.wiley.com';

test('Search Functionality', async ({ page }) => {
  await page.goto(BASE_URL);
  
  // Perform a search
  await page.fill('input[aria-label="Search"]', 'machine learning'); // Adjust locator if necessary
  await page.click('button[aria-label="Submit Search"]'); // Adjust locator if necessary
  
  // Validate search results
  await expect(page.locator('text=Search Results')).toBeVisible(); // Adjust text or locator as per UI
  await expect(page.locator('text=machine learning', { hasText: true })).toBeVisible(); // At least one result should match the query
});
