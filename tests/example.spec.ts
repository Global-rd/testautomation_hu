import { test, expect } from '@playwright/test';
import {KeyProviderService} from '../support/services/key-provider.service';


test.describe('Test full screen calculator', () => {

    let keyProviderService: KeyProviderService;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.online-calculator.com/full-screen-calculator/');



    });

    test('get started', async ({ page }) => {

        page.mouse.move()
    });

});


