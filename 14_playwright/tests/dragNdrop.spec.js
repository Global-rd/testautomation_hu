import { expect, test } from '@playwright/test';

test('Drag Box A and drop onto Box B', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/drag-and-drop');

  const boxA = page.locator('#column-a');
  const boxB = page.locator('#column-b');


  await boxA.dragTo(boxB);


  const boxAText = await boxA.locator('header').textContent();
  const boxBText = await boxB.locator('header').textContent();

  expect(boxAText).toBe('B');
  expect(boxBText).toBe('A');
});