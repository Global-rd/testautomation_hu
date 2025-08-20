import {BasePage} from "./BasePage";

export class NewAccountPage extends BasePage {
    baseUrl: string = '/openaccount.htm';

    selectors = {
        openAccount: '[href="openaccount.htm"]',
        transferFunds: '[href="transfer.htm"]',
        requestLoan: '[href="requestloan.htm"]',
    };
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