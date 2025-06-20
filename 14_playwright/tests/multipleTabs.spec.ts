import { expect, test } from '@playwright/test';

test('Handle new tab opened from link', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://practice.expandtesting.com/windows');

  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('link', { name: 'Click Here' }).click(),
  ]);


  await newTab.waitForLoadState();

  
  expect(await newTab.title()).toBe('Example of a new window');
  await expect(newTab.getByRole('heading', { name: 'Example of a new window page' })).toContainText('Example of ');
});