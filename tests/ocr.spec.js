import { CALCULATOR_URL, getCanvasCenter } from '../support/helpers';
import { expect, test } from '@playwright/test';

import Tesseract from 'tesseract.js';
import { keys } from '../support/keys';

// Helper function to click calculator button
const clickCalculatorButton = async (page, positionX, positionY, canvasSize, digit) => {
    const buttonData = keys.getButtons(canvasSize.width, canvasSize.height, digit);
    const clickX = positionX + (buttonData[0] - canvasSize.width / 2);
    const clickY = positionY + (buttonData[1] - canvasSize.height / 2);
    console.log(`Clicking digit ${digit} at position:`, [clickX, clickY]);
    await page.mouse.click(clickX, clickY);
    await page.waitForTimeout(500);
};

test('calculates', async ({ page }) => {
    await page.goto(CALCULATOR_URL);

    const { x: positionX, y: positionY } = await getCanvasCenter(page);
    console.log("Canvas center position:", { positionX, positionY });

    // Get canvas size for button calculations
    const canvasSize = await page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        return { width: canvas.width, height: canvas.height };
    });

    const inputDigit1 = 1;
    const inputDigit2 = 2;
    const expectedNumber = Number(inputDigit1.toString() + inputDigit2.toString());
    await page.waitForTimeout(500);
    // Click the two digits
    await clickCalculatorButton(page, positionX, positionY, canvasSize, inputDigit1);
    await page.waitForTimeout(500);
    await clickCalculatorButton(page, positionX, positionY, canvasSize, inputDigit2);


    // Perform OCR on canvas
    const dataURL = await page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        return canvas.toDataURL();
    });

    const { data: { text } } = await Tesseract.recognize(dataURL, 'eng', {
        tessedit_char_whitelist: '0123456789.',
        tessedit_pageseg_mode: '7'
    });

    console.log('OCR Result:', text);

    // Extract first number from OCR result
    const lines = text.split('\n').filter(line => line.trim());
    const ocrNumber = lines[0] || text.split('\n')[0];
    console.log('Extracted number:', ocrNumber);

    // Verify OCR result matches expected
    expect(Number(ocrNumber)).toBe(expectedNumber);
});