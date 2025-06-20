import { expect } from "playwright/test";
export async function selectDateOffset(page, offsetDays, { click = false, expectEnabled = true } = {}) {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    const dateStr = date.toISOString().slice(0, 10); // 'YYYY-MM-DD'
    const locator = page.locator(`button[data-date="${dateStr}"]`);

    if (expectEnabled) {
        await expect(locator).toBeEnabled();
        if (click) {
            await locator.click();
        }
    } else {
        await expect(locator).toBeDisabled();
    }
}