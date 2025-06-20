import { expect } from "playwright/test";

/**
 * Verifies that the Check-out date is after the Check-in date.
 *
 * @param {object} page - Playwright page object
 * @param {object} options
 * @param {string} options.checkInSelector - CSS or placeholder selector for Check-in input
 * @param {string} options.checkOutSelector - CSS or placeholder selector for Check-out input
 */


//unused in the project, just example
export async function verifyDateInputs(page, {
    checkInSelector = 'input[placeholder="Check-in"]',
    checkOutSelector = 'input[placeholder="Check-out"]'
} = {}) {
    const checkInValue = await page.locator(checkInSelector).inputValue();
    const checkOutValue = await page.locator(checkOutSelector).inputValue();

    const checkInDate = new Date(checkInValue);
    const checkOutDate = new Date(checkOutValue);

    console.log('Check-in:', checkInDate.toISOString());
    console.log('Check-out:', checkOutDate.toISOString());

    expect(checkOutDate.getTime()).toBeGreaterThan(checkInDate.getTime());
}