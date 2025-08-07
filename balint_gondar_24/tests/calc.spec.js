import { CALCULATOR_URL, CANVAS_RENDER_DELAY, TAB_OPEN_DELAY, getCanvasCenter } from '../support/helpers';
import { expect, test } from '@playwright/test';

import { pixelData } from '../support/pixels';

test('hovering', async ({ page }) => {
    await page.goto(CALCULATOR_URL);

    const { x: positionX, y: positionY } = await getCanvasCenter(page);
    console.log("Canvas center position:", { positionX, positionY });

    //hovering on button number 6
    console.log('hovering on position: ' + positionX + '  ' + positionY)
    await page.mouse.move(positionX, positionY)

    // Wait for canvas to be ready and stable
    await page.waitForLoadState('networkidle');
    await expect(page.locator('canvas')).toBeVisible();
    // Small delay to ensure canvas rendering is complete
    await page.waitForTimeout(CANVAS_RENDER_DELAY);

    let hoveredPixelData = await pixelData(page);
    console.log(hoveredPixelData)

    //moving mouse away to a different position on canvas
    await page.mouse.move(positionX + 100, positionY + 100)

    // Wait for canvas to be ready and stable after mouse move
    await page.waitForLoadState('networkidle');
    await expect(page.locator('canvas')).toBeVisible();
    // Small delay to ensure canvas rendering is complete
    await page.waitForTimeout(CANVAS_RENDER_DELAY);

    let defaultPixelData = await pixelData(page);
    console.log(defaultPixelData)

    // Compare pixel data arrays - they should be different at different positions
    expect(defaultPixelData).not.toEqual(hoveredPixelData)
    // Or test individual RGB values if needed
    expect(defaultPixelData[0]).not.toBe(hoveredPixelData[0])
    expect(defaultPixelData[1]).not.toBe(hoveredPixelData[1])
    expect(defaultPixelData[2]).not.toBe(hoveredPixelData[2])
});

test('verify link', async ({ browser }) => {
    const context = await browser.newContext();
    const firstTab = await context.newPage();
    let positionX;
    let positionY;

    await firstTab.goto('https://www.online-calculator.com//html5/simple/index.php?v=10');
    const canvas = await firstTab.$('canvas');
    let boundingBox = await firstTab.evaluate(() => {
        const canvas = document.querySelector('canvas');
        return canvas?.getBoundingClientRect();
    })

    positionX = boundingBox.x + (Number(boundingBox?.width) / 2);
    positionY = boundingBox.y + (Number(boundingBox?.height) / 2);

    positionY = positionY + ((Number(boundingBox?.height) / 2) * 0.9)


    await firstTab.mouse.click(positionX, positionY)

    await firstTab.waitForTimeout(2000);
    const pages = context.pages();
    const secondTab = pages[1];
    await secondTab.waitForLoadState();

    const url = await secondTab.url()
    console.log(url)
    //would be more elegant to get the link text from the ui and compare it.
    expect(url).toContainEqual('www.online-calculator.com')
});
