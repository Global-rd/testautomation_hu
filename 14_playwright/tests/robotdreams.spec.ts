import { chromium, expect, test } from '@playwright/test';

test('Robodreams - képzéseink oldal betöltése és részletező link', async ({ page }) => {
    
    await page.goto('https://robotdreams.hu');
    await page.locator('[data-initial-route="/course"]').last().click();

    const courseLinks = page.locator('.filter-list');
    const qaFilter = courseLinks.locator('li', { hasText: 'QA' });
    await qaFilter.first().click();

    await expect(page.url()).toContain('https://robotdreams.hu/course/qa')

    const courseCards = page.locator('.course-card__lead');

    const count = await courseCards.count();
    for (let i = 0; i < count; i++) {
        const card = courseCards.nth(i);

        const title = await card.locator('.course-card__title').innerText();
        if (title.includes('Playwright')) {
            const dateText = await card.locator('.c-date').innerText();
            expect(dateText.trim()).toContain('Hamarosan');
        }

    }
});

test('Robodreams - mobilnézetben manifest.mp4 lejátszása a Rólunk oldalon', async ({ page }) => {
  
    await page.setViewportSize({ width: 375, height: 812 });

   
    await page.goto('https://robotdreams.hu');

  
    await page.locator('footer').scrollIntoViewIfNeeded();

    
    const aboutLink = page.getByRole('link', { name: 'Rólunk' })
    await aboutLink.click();

    
    await page.waitForLoadState('networkidle');
    await page.mouse.wheel(0, 2000);


    const video = page.getByAltText('manifest.mp4');
    await expect(video).toBeVisible();
    await video.click()

   const videomode = await page.locator('body.video-mode');
   expect(videomode).toBeVisible();
   await page.screenshot({path: 'screenshots/rd_video.png'})
});
