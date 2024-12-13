import { test, expect } from '@playwright/test';

test('Search for an article on Wiley Online Library', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://onlinelibrary.wiley.com/');

  // Wait for the page to load completely
  await page.waitForLoadState('load');

  // Interact with the search bar
  const searchInput = page.locator('input[name="q"]'); // Assuming the search input field has the name "q"
  await searchInput.fill('Playwright'); // Search for 'Playwright' or any term you're interested in

  // Submit the search form
  await searchInput.press('Enter');

  // Wait for the search results to appear
  await page.waitForSelector('.search-results'); // Update with the correct CSS selector for search results

  // Check if results are visible
  const results = page.locator('.search-results'); // Replace with actual selector for search results
  await expect(results).toBeVisible();

  // Optionally, take a screenshot for debugging
  await page.screenshot({ path: 'wiley_search_results.png' });
});

test('Verify login functionality on Wiley Online Library', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://onlinelibrary.wiley.com/');

  // Find and click the "Sign In" button (adjust selector as needed)
  const signInButton = page.locator('text="Sign In"');
  await signInButton.click();

  // Wait for the login page to load
  await page.waitForSelector('input[name="username"]');

  // Fill out the login form
  const usernameField = page.locator('input[name="username"]');
  const passwordField = page.locator('input[name="password"]');
  await usernameField.fill('your-username');
  await passwordField.fill('your-password');

  // Click the login button
  const loginButton = page.locator('button[type="submit"]');
  await loginButton.click();

  // Wait for the login to complete (adjust as needed)
  await page.waitForSelector('text="Welcome"'); // Replace with an actual selector indicating a successful login

  // Check if login was successful
  const welcomeMessage = page.locator('text="Welcome"');
  await expect(welcomeMessage).toBeVisible();

  // Optionally, take a screenshot after login
  await page.screenshot({ path: 'wiley_login_success.png' });
});
