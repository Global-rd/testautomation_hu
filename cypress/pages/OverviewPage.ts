import {BasePage} from "./BasePage";

export class OverviewPage extends BasePage {
    baseUrl: string = '/overview.htm';

    selectors = {
        openAccount: '[href="openaccount.htm"]',
        transferFunds: '[href="transfer.htm"]',
        requestLoan: '[href="requestloan.htm"]',
    };

    constructor() {
        super();
    }

    public verifyAccountPresent(accountId: number, balance: number) {
        const accountIdTd = cy.get(`[href=\"activity.htm?id=${accountId.toString()}\"]`);
        accountIdTd.should('be.visible');
        accountIdTd.should('contain.text', accountId);


        accountIdTd
            .parents('tr')
            .find('td')
            .eq(1)
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.equal(balance.toString());
            });
    }

    public async goToNewAccount(): Promise<void> {
        cy.get(this.selectors.openAccount).click();
    }

    public async goToTransferPage(): Promise<void> {
        cy.get(this.selectors.transferFunds).click();
    }

    public async goToRequestLoan(): Promise<void> {
        cy.get(this.selectors.requestLoan).click();
    }
}