import {BasePage} from "./BasePage";

export class NewAccountPage extends BasePage {
    baseUrl: string = '/openaccount.htm';

    selectors = {
        accountTypeDropDown: '#type',
        openAccountButton: '[type="button"]',
        openAccountResult: '#openAccountResult',
        newAccountId: '#newAccountId',
    };

    public async createNewAccount(type: string): Promise<void> {
        cy.get(this.selectors.accountTypeDropDown).select(type);
        cy.get(this.selectors.openAccountButton).click();
    }

    public async verifyOpenAccountResult(message: string): Promise<void> {
        cy.get(this.selectors.openAccountResult).should('contain.text', message);
    }

    public returnNewAccountNumber(): Cypress.Chainable<number> {
        this.verifyOpenAccountResult('Account Opened!');

        return cy.get(this.selectors.newAccountId)
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                return parseInt(text.trim(), 10);
            });
    }
}