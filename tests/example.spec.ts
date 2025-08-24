import { test, expect } from '@playwright/test';
import {CalculatorPage} from '../pages/CalculatorPage';
import {ButtonLocation} from '../support/model/HelperObjects';
import {ButtonProviderService} from '../support/services/button-provider.service';
import {CalculatorService} from '../support/services/calculator.service';


test.describe('Test full screen calculator', () => {

    let buttonProviderService: ButtonProviderService;
    let calculatorPage: CalculatorPage<Record<string, ButtonLocation>>;
    let calculatorService: CalculatorService;

    test.beforeEach(async ({ page }) => {

        await page.route('**/*', (route) => {
            // A list of common ad domains
            const adDomains = ['doubleclick.net', 'googlesyndication.com', 'adservice.google.com'];
            const url = route.request().url();

            // Abort the request if the URL contains a known ad domain
            if (adDomains.some(domain => url.includes(domain))) {
                console.log(`Blocking ad request: ${url}`);
                route.abort();
            } else {
                route.continue();
            }
        });

        await page.goto('https://www.online-calculator.com/full-screen-calculator/');
        await page.locator('button[mode="primary"]').click();
        await page.waitForLoadState("domcontentloaded");

        calculatorService = new CalculatorService(page);
        let size = await calculatorService.getCalculatorSize();
        buttonProviderService = new ButtonProviderService(size);
        calculatorPage = new CalculatorPage(buttonProviderService.getCalculatorKeys(), page, size);

    });

    test('get started', async ({ page }) => {
        calculatorPage.clickButton('6');

        const result = await calculatorPage.readResult(buttonProviderService.resultScreenSize);

        expect(result).toBe('6');
    });

});


