import { Locator, Page } from '@playwright/test';

export class CookieConsent {
  private readonly page: Page;
  private readonly agreeButton: Locator;
  private readonly footerAdButton: Locator;
  private readonly moreOptionsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.agreeButton = this.page.locator('text=AGREE');
    this.footerAdButton = this.page.locator('.publift-widget-sticky_footer-button');
    this.moreOptionsButton = this.page.locator('text=MORE OPTIONS');
  }

  async acceptIfVisible() {
    try {
      await this.agreeButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.agreeButton.click();

      await this.footerAdButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.footerAdButton.click();

      await this.page.waitForLoadState('domcontentloaded');
      console.log('Cookie consent elfogadva');
    } catch {
      console.log('Cookie consent nem jelent meg, léptem tovább.');
    }
  }
}
