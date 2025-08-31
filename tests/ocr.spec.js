//Calculator OCR Test with Playwright and Tesseract.js

import { CALCULATOR_URL, getCanvasCenter } from '../support/helpers';
import { test as numbersBase, expect } from '@playwright/test';
import Tesseract from 'tesseract.js';
import { keys } from '../support/keys';


const CANVAS_RENDER_DELAY = 500;

const test = numbersBase.extend({
  number1: async ({}, use) => {
    const data = require('./fixture/numbers.json');
    await use(parseInt(data.number1, 10));
  },
  number2: async ({}, use) => {
    const data = require('./fixture/numbers.json');
    await use(parseInt(data.number2, 10));
  }
});

// Helper function to click calculator button
const clickCalculatorButton = async (page, positionX, positionY, canvasSize, digit) => {
    const buttonData = keys.getButtons(canvasSize.width, canvasSize.height, digit);
    const clickX = positionX + (buttonData[0] - canvasSize.width / 2);
    const clickY = positionY + (buttonData[1] - canvasSize.height / 2);
    console.log(`Clicking digit ${digit} at position:`, [clickX, clickY]);
    await page.mouse.click(clickX, clickY);
    await page.waitForTimeout(500);
};

test('Calculator OCR Tests', async ({ page, number1, number2 }) => {

    const result = number1 + number2;

    const digits = number1.toString().split('');

    const inputDigit1 = parseInt(digits[0], 10); // 4
    const inputDigit2 = parseInt(digits[1], 10); // 2
    const inputDigit3 = 'adds'; // +
    const inputDigit4 = number2; //5
    const inputDigit5 = 'eq'; 
    
    await page.goto(CALCULATOR_URL);
    const { x: positionX, y: positionY } = await getCanvasCenter(page);
    await page.waitForTimeout(CANVAS_RENDER_DELAY);

    //Get canvas size
    const canvasSize = await page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        return { width: canvas.width, height: canvas.height };
    });

    // Click the two digits
    await clickCalculatorButton(page, positionX, positionY, canvasSize, inputDigit1);
    await page.waitForTimeout(500);
    await clickCalculatorButton(page, positionX, positionY, canvasSize, inputDigit2);
    await page.waitForTimeout(500);
    await clickCalculatorButton(page, positionX, positionY, canvasSize, inputDigit3);
    await page.waitForTimeout(500);
    await clickCalculatorButton(page, positionX, positionY, canvasSize, inputDigit4);
    await page.waitForTimeout(500);
    await clickCalculatorButton(page, positionX, positionY, canvasSize, inputDigit5);


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
    expect(Number(ocrNumber)).toBe(result);
});