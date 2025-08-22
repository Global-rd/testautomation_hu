import { CALCULATOR_URL, getCanvasCenter, getCanvasSize, clickCalculatorButton, clearCalculator } from '../support/helpers';
import { expect, test } from '@playwright/test';
const { calculatorData } = require('../fixtures/test-calculations.js');

import Tesseract from 'tesseract.js';
import { keys } from '../support/keys';

test.describe('Calculator tests', () => {
    let canvasSize;
    let positionX;
    let positionY;

    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.BASE_URL);
        const center = await getCanvasCenter(page);
        positionX = center.x;
        positionY = center.y;
        canvasSize = await getCanvasSize(page);
    });

    test.afterEach(async ({ page }) => {
        await clickCalculatorButton(page, positionX, positionY, canvasSize, 'C', keys);
        await page.waitForTimeout(500);
    });

    test('execute calculations', async ({ page }) => {
        for(const entry of calculatorData){
            const lastEntry = [...entry.calc][[...entry.calc].length - 1];
            const pressEquals = lastEntry === 'C' || lastEntry === '=' ? false : true;
            console.log('pressEquals', pressEquals);

            for(const key of [...entry.calc]){
                await clickCalculatorButton(page, positionX, positionY, canvasSize, key, keys);
            }

            if(pressEquals){
                await clickCalculatorButton(page, positionX, positionY, canvasSize, '=', keys);
            }

            await page.waitForTimeout(500);

            // Perform OCR on canvas
            const dataURL = await page.evaluate(() => {
                const canvas = document.querySelector('canvas');
                return canvas.toDataURL();
            });

            const { data: { text } } = await Tesseract.recognize(dataURL, 'eng', {
                tessedit_char_whitelist: '0123456789.',
                tessedit_pageseg_mode: '7'
            });

            const match = text.match(/[\d.]+/);
            const ocrResult = match ? match[0] : '';

            // Verify OCR result matches expected
            expect(ocrResult).toBe(entry.result);

            await clearCalculator(page, positionX, positionY, canvasSize, keys);
        }
    });

})

