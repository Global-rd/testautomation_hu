import {BasePage} from "./BasePage";

export class RequestLoanPage extends BasePage{
    baseUrl = 'requestloan.htm';
    selectors = {
        loanAmount: '#amount',
        downPayment: '#downPayment',
        fromAccountId: '#fromAccountId',
        applyButton: '[value="Apply Now"]',
        loanStatus: '#loanStatus',
    }

    public setLoanAmount(amount: number): void {
        cy.get(this.selectors.loanAmount).type(amount.toString());
    }

    public setDownPayment(amount: number): void {
        cy.get(this.selectors.downPayment).type(amount.toString());
    }

    public selectAccount(accountId: number): void {
        cy.get(this.selectors.fromAccountId).select(accountId.toString());
    }

    public applyForLoan(): void {
        cy.get(this.selectors.applyButton).click();
    }

    public verifyButtonState(enabled: boolean): void {
        cy.get(this.selectors.downPayment).should(`${enabled ? 'not.be.disabled' : 'be.disabled'}`);
    }

    public verifyLoanStatus(status: string): void {
        cy.get(this.selectors.loanStatus).should('be.visible').should('contain.text', status);
    }


}