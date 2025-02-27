import { test, expect } from '@playwright/test';

test.describe('Bucket List Page', () => {
    test.beforeEach(async ({ page }) => {
      // Set up response mocking before navigation
      await page.route('**/api/bucket-list/**', async (route) => {
        const url = route.request().url();
        
        // For GET requests - be more specific with the URL
        if (route.request().method() === 'GET' && url.endsWith('/api/bucket-list/')) {
          console.log('Mocking GET bucket list response');
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([
              {
                _id: '1',
                title: 'Paris',
                image: 'paris.jpg'
              },
              {
                _id: '2',
                title: 'Tokyo',
                image: 'tokyo.jpg'
              },
              {
                _id: '3',
                title: 'New York',
                image: null
              }
            ])
          });
        }
        
        // For DELETE requests
        if (route.request().method() === 'DELETE') {
          const id = url.split('/').pop();
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ success: true })
          });
        }
      });
      
      // Navigate to the bucket list page after setting up mocks
      await page.goto('http://localhost:5173/bucket-list');
    });

  test('should load and display bucket list items', async ({ page }) => {
    // Ensure the page is fully loaded before interacting
    await page.waitForSelector('body');

    // Wait for the items to load
    await page.waitForSelector('.grid .border', { state: 'visible', timeout: 20000 });

    // Verify the number of items
    const itemTitles = page.locator('.grid .border .p-4 h2');
    await expect(itemTitles).toHaveCount(3);

    // Verify the displayed titles
    await expect(itemTitles.nth(0)).toHaveText('Paris');
    await expect(itemTitles.nth(1)).toHaveText('Tokyo');
    await expect(itemTitles.nth(2)).toHaveText('New York');

    // Verify images
    await expect(page.locator('img[alt="Paris"]')).toHaveAttribute('src', 'http://localhost:3000/destinations_image/paris.jpg');
    await expect(page.locator('img[alt="New York"]')).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  test('should remove an item when heart icon is clicked', async ({ page }) => {
    // Wait for items to load
    await page.waitForSelector('.grid .border', { state: 'visible', timeout: 20000 });

    // Count before deletion
    const initialCount = await page.locator('.grid .border').count();
    console.log(`Initial count: ${initialCount}`);

    // Click the first heart button
    const heartButtons = page.locator('.grid .border button');
    await heartButtons.first().click();

    // Verify one item is removed
    await expect(page.locator('.grid .border')).toHaveCount(initialCount - 1);
  });

  test('should display a loading state', async ({ page }) => {
    // Mock API response delay
    await page.route('**/api/bucket-list/', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{ _id: '1', title: 'Paris', image: 'paris.jpg' }])
      });
    });

    // Reload the page
    await page.reload();

    // Verify loading state appears
    await expect(page.locator('div:text("Loading...")')).toBeVisible();

    // Wait for content to appear
    await page.waitForSelector('.grid .border', { state: 'visible', timeout: 20000 });

    // Ensure loading disappears
    await expect(page.locator('div:text("Loading...")')).not.toBeVisible();
  });

  test('should handle an error when deleting an item', async ({ page }) => {
    // Wait for items to load
    await page.waitForSelector('.grid .border', { state: 'visible', timeout: 20000 });

    // Mock an error for DELETE request
    await page.route('**/api/bucket-list/1', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' })
      });
    });

    // Click the first heart button
    const heartButtons = page.locator('.grid .border button');
    await heartButtons.first().click();

    // Ensure the item count remains the same (deletion failed)
    await expect(page.locator('.grid .border')).toHaveCount(3);
  });
});
