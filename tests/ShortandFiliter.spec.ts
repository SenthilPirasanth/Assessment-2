import { test, expect } from '@playwright/test';

const BASE_URL = 'https://onlinelibrary.wiley.com';

test('Sorting and Filtering in Search Results', async ({ page }) => {
  // Ensure navigation and catch unexpected errors
  try {
    console.log('Navigating to the Wiley Online Library homepage');
    await page.goto(BASE_URL, { waitUntil: 'load' });

    console.log('Waiting for the search bar to become visible');
    // Confirm that the search bar is present and ready
    const searchBar = await page.waitForSelector('input[aria-label="Search"]', { timeout: 15000 });
    if (!searchBar) {
      throw new Error('Search bar not found. Locator may be incorrect.');
    }

    console.log('Performing search for "machine learning"');
    await page.fill('input[aria-label="Search"]', 'machine learning');
    await page.click('button[aria-label="Submit Search"]');

    console.log('Waiting for search results to load');
    await page.waitForSelector('text=Search Results', { timeout: 15000 });

    console.log('Validating search results are displayed');
    await expect(page.locator('text=Search Results')).toBeVisible();

    console.log('Applying filter: Filter by Year');
    await page.click('button[aria-label="Filter by Year"]'); // Adjust locator
    await page.click('text=2023'); // Adjust filter value if necessary

    console.log('Validating results after applying filter');
    await expect(page.locator('text=2023')).toBeVisible();

    console.log('Applying sorting: Newest First');
    await page.click('button[aria-label="Sort"]'); // Adjust locator
    await page.click('text=Newest First'); // Adjust sorting value if necessary

    console.log('Validating results are sorted correctly');
    const firstResultDate = await page.locator('.result-date').first().textContent(); // Replace '.result-date' with actual locator
    const secondResultDate = await page.locator('.result-date').nth(1).textContent();

    if (firstResultDate && secondResultDate) {
      const firstDate = new Date(firstResultDate);
      const secondDate = new Date(secondResultDate);
      expect(firstDate >= secondDate).toBeTruthy(); // Validate sorting order
    }
  } catch (error) {
    console.error('Error during test execution:', error.message);
    throw error; // Rethrow error to ensure failure is reported
  }
});
