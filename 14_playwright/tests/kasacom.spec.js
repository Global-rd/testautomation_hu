import { expect, test } from '@playwright/test';

import { selectDateOffset } from '../support/date.js'

const BASE_URL = 'https://kasa.com/';

test.describe('Kasa.com - Datepicker tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByRole('textbox', { name: 'Check-in' })).toBeVisible();
  });

  test('should not allow selecting past date', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Check-in' }).click()
    await page.waitForSelector('.date-picker');

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const dateString = yesterday.toISOString().slice(0, 10);


    const buttonLocator = page.locator(`button[data-date="${dateString}"]`);
    await expect(buttonLocator).toBeDisabled();
  });

  test('Check-out date must be after check-in date', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Check-in' }).click()
    await page.waitForSelector('.date-picker');

    // select tomorrow and click it
    await selectDateOffset(page, 1, { click: true, expectEnabled: true });

    // assert that yesterday is disabled
    await selectDateOffset(page, -1, { click: false, expectEnabled: false });

    // select 3 days later and click
    await selectDateOffset(page, 3, { click: true, expectEnabled: true });

    const checkInValue = await page.getByRole('textbox', { name: 'Check-in' }).inputValue();
    const checkOutValue = await page.getByRole('textbox', { name: 'Check-out' }).inputValue();

    const checkInDate = new Date(checkInValue);
    const checkOutDate = new Date(checkOutValue);

    expect(checkOutDate.getTime()).toBeGreaterThan(checkInDate.getTime());
  });

});