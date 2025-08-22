export class cookieConsent {
  constructor(page) {
    this.page = page;
    this.agreeButton = this.page.locator('text=AGREE');
    this.footerAdButton = this.page.locator('.publift-widget-sticky_footer-button')
    this.moreOptionsButton = this.page.locator('text=MORE OPTIONS');
  }

  async acceptIfVisible() {
    try {
      
      await this.agreeButton.waitFor({ state: 'visible' });
      await this.agreeButton.click();

      // Megvárja a footer ad gombot is
      await this.footerAdButton.waitFor({ state: 'visible' });
      await this.footerAdButton.click();

      await this.page.waitForLoadState('domcontentloaded');
      console.log('Cookie consent elfogadva');
    } catch {
      // Ha nem jön fel a cookie popup, csak logoljuk és lépünk tovább
      console.log('Cookie consent nem jelent meg, léptem tovább.');
    }
  }
}