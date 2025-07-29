const { test, expect } = require('@playwright/test');


test.describe('Webpark Parking Calculator - API és UI integráció', () => {
    const apiUrl = 'https://practice.expandtesting.com/webpark/calculate-cost';
    const testPayload = {
        parkType: 'Valet',
        entryDate: '2025-08-21T16:11',
        exitDate: '2025-08-22T16:11',
    };

    test('API kalkuláció eredménye megegyezik a UI-on láthatóval @smoke', async ({ page, request }) => {
        // 1. API hívás
        const apiRes = await request.post(apiUrl, {
            form: testPayload,
        });
        expect(apiRes.status()).toBe(200);
        const apiBody = await apiRes.json();

        // 2. UI kitöltés ugyanazokkal az adatokkal
        await page.goto('https://practice.expandtesting.com/webpark');
        await page.locator('select').first().selectOption({ label: 'Valet Parking' });
        // Dátumok és időpontok a testPayload-ból
        const [entryDate, entryTime] = testPayload.entryDate.split('T');
        const [exitDate, exitTime] = testPayload.exitDate.split('T');
        await page.getByPlaceholder('Entry Time').fill(entryTime);
        await page.getByPlaceholder('Exit Date').fill(exitDate);
        await page.getByPlaceholder('Exit Time').fill(exitTime);
        await page.getByPlaceholder('Entry Date').fill(entryDate);
        await page.locator('body').click(0, 0);
        await page.getByRole('button', { name: 'Calculate Cost' }).click();

        // 3. Ellenőrzés: #resultValue text === apiBody.cost + '.00€'
        const resultText = await page.locator('#resultValue').textContent();
        expect(resultText.trim()).toBe(`${apiBody.cost}.00€`);
    });

    test('UI-n olvasott day rate alapján API response cost ellenőrzése több napra @regression', async ({ page, context }) => {
        await page.goto('https://practice.expandtesting.com/webpark');
        // 1. Kiolvassuk a Valet Parking day rate-et a UI-ról
        const rateText = await page.locator('.card-header', { hasText: 'Valet Parking' })
            .locator('..')
            .locator('.card-block li')
            .first()
            .textContent();
        const dayRate = parseFloat(rateText);

        // 2. Kitöltjük a kalkulátort
        const entryDate = '2025-08-21';
        const exitDate = '2025-08-23';

        // Intercept API hívás Promise-alapú szinkronizációval
        let apiResponse;
        let apiResponsePromiseResolve;
        const apiResponsePromise = new Promise(resolve => { apiResponsePromiseResolve = resolve; });
        await page.route(apiUrl, async (route, request) => {
            const response = await route.fetch();
            apiResponse = await response.json();
            apiResponsePromiseResolve(apiResponse);
            route.fulfill({ response });
        });

        await page.locator('select').first().selectOption({ label: 'Valet Parking' });
        await page.getByPlaceholder('Entry Date').fill(entryDate);
        await page.getByPlaceholder('Entry Time').fill('16:11');
        await page.getByPlaceholder('Exit Date').fill(exitDate);
        await page.getByPlaceholder('Exit Time').fill('16:11');
        await page.getByRole('button', { name: 'Calculate Cost' }).click();

        // 3. Számoljuk a napok különbségét
        const start = new Date(entryDate);
        const end = new Date(exitDate);
        const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24));

        // 4. Promise-alapú szinkronizáció: várjuk meg az apiResponse-t
        const response = await apiResponsePromise;
        expect(response).toBeDefined();
        expect(response.cost).toBe(dayRate * diffDays);
    });
}); 