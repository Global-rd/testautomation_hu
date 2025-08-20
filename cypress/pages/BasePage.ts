export abstract class BasePage {
    readonly abstract selectors: {};
    readonly abstract baseUrl: string;

    public async verifyPageUrl(): Promise<void> {
        cy.url().should('include', this.baseUrl);
    }

}
