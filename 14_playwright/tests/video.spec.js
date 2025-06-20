import { expect, test } from '@playwright/test';

test('W3Schools - HTML5 videó lejátszás', async ({ page }) => {

  await page.goto('https://www.w3schools.com/html/html5_video.asp');

  await page.getByText('Accept all & visit the site').click()

  const video = page.locator('video').first();

  await expect(video).toBeVisible();

  //Lejátszás elindítása
  await video.evaluate((vid) => vid.play());
  await page.waitForTimeout(3000);

  // Ellenőrzés: currentTime alapján
  const currentTime = await video.evaluate((vid) => vid.currentTime);
  console.log('Video currentTime:', currentTime);
  expect(currentTime).toBeGreaterThan(0);
  await page.screenshot({ path: 'screenshots/video.png' });

});
