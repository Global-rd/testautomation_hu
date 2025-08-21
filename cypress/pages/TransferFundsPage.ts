import {BasePage} from "./BasePage";

export class TransferFundsPage extends BasePage{
    baseUrl = 'transfer.htm';

    selectors = {
        amount: '#amount',
        fromAccountId: '#fromAccountId',
        toAccountId: '#toAccountId',
        transferButton: '[value="Transfer"]'
    }

    public selectFromAccountId(fromAccountId: string): void {
        cy.get(this.selectors.fromAccountId).select(fromAccountId);
    }

    public selectToAccountIdNotEqual(fromAccountId: string): void{
        cy.get(this.selectors.toAccountId)
            .find('option')
            .not(`[value="${fromAccountId}"]`)
            .then(($options) => {
                const count = $options.length;
                const randomIndex = Cypress._.random(0, count - 1);
                const randomOption = $options.eq(randomIndex);
                const valueToSelect = randomOption.val();

                //Select the randomly chosen value from the dropdown
                cy.get(this.selectors.toAccountId).select(String(valueToSelect));
            });
    }

    public selectToAccountId(toAccountId: string): void {
        cy.get(this.selectors.toAccountId).select(toAccountId);
    }

    public setAmount(amount: number): void {
        cy.get(this.selectors.amount).type(amount.toString())
    }

    public doTransfer(): void {
        cy.get(this.selectors.transferButton).click();
    }

    public verifySubmitButtonDisabled() {
        cy.get(this.selectors.transferButton).should('be.disabled');
    }
}