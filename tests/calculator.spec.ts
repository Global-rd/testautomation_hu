import { test, expect } from '@playwright/test';
import {CalculatorPage} from '../pages/CalculatorPage';
import {ButtonLocation} from '../support/model/HelperObjects';
import {ButtonProviderService} from '../support/services/button-provider.service';
import {CalculatorService} from '../support/services/calculator.service';
import {AdBlockerService} from '../support/services/ad-blocker.service';
import {DataService} from '../support/services/data.service';


test.describe('Test full screen calculator', () => {

    let buttonProviderService: ButtonProviderService;
    let calculatorPage: CalculatorPage<Record<string, ButtonLocation>>;
    let calculatorService: CalculatorService;
    let dataService: DataService;

    let page: any;
    let browser: any;

    test.beforeAll(async ({playwright}) => {
        browser = await playwright.chromium.launch();
        page = await browser.newPage();
        const adBlocker: AdBlockerService = new AdBlockerService(page);
        await adBlocker.blockAds();

        await page.goto('https://www.online-calculator.com/full-screen-calculator/');
        await page.locator('button[mode="primary"]').click();
        await page.waitForLoadState("domcontentloaded");

        calculatorService = new CalculatorService(page);
        let size = await calculatorService.getCalculatorSize();
        buttonProviderService = new ButtonProviderService(size);
        calculatorPage = new CalculatorPage(buttonProviderService.getCalculatorKeys(), page, size);
        dataService = new DataService();
    })

    test.beforeEach(async () => {
        await calculatorPage.clickButton("C");
    })

    test.afterAll(async () => {
        await page.close();
        await browser.close();
    });

    /***
     Consolidated into one test instead of checking small bits separately to improve test runtime
     */
    test('can type multiple digits and decimals and switches to negative', async () => {
        await calculatorPage.clickButton('6');
        await calculatorPage.clickButton('3');
        await calculatorPage.clickButton('.');
        await calculatorPage.clickButton('5');
        await calculatorPage.clickButton('+/-');

        const result = await calculatorPage.readResult(buttonProviderService.resultScreenSize);

        expect(result).toBe('-63.5');
    })

    test('can resolve different operations (parsed from fixture strings)', async () => {
        const expressions: string[] = dataService.loadExpressions();

        for(let expression of expressions) {
            await calculatorPage.clickButton("C");

            const expected: number = dataService.evaluate(expression);

            const buttons: RegExpMatchArray | null = buttonProviderService.parseInput(expression);
            if(!!buttons){
                for(let button of buttons){
                    await calculatorPage.clickButton(button);
                }

                await calculatorPage.clickButton("=");
                const result = await calculatorPage.readResult(buttonProviderService.resultScreenSize);

                expect(result).toBe(expected.toString());
            }
        }
    });

});


