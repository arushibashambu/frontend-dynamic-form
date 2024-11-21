import { test, expect } from '@playwright/test';

test('submits form', async ({ page }) => {
  // Navigate to the page
  await page.goto('http://localhost:3000');
  
  // Fill out the form fields
  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[name="email"]', 'john.doe@example.com');
  
  // Submit the form
  await page.click('button[type="submit"]');
  
  // Check that the success message appears
  const successMessage = await page.locator('text=Form submitted successfully!');
  await expect(successMessage).toBeVisible();
});
