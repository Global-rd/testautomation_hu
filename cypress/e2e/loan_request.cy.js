import { getFirstAccountId, submitLoanRequest } from '../support/utils';

describe('Loan Request – Partial Required Field – UI + API', () => {
    let fromAccountId;

    beforeEach(() => {
        cy.initEnvironment();
        cy.login();
    });

    it('should allow loan request with only Loan Amount filled', () => {
        getFirstAccountId().then((fromAccountId) => {
            submitLoanRequest({ loanAmount: 5000, downPayment: '', fromAccountId });
            cy.contains('Loan Request Processed').should('be.visible');
            cy.contains('Congratulations').should('be.visible');
        });
    });

    it('should allow loan request with only Down Payment filled', () => {
        getFirstAccountId().then((fromAccountId) => {
            submitLoanRequest({ loanAmount: '', downPayment: 500, fromAccountId });
            cy.contains('Loan Request Processed').should('be.visible');
            cy.contains('Congratulations').should('be.visible');
        });
    });

    it.only('should allow loan request with Loan amount and Down Payment filled', () => {
        getFirstAccountId().then((fromAccountId) => {
            submitLoanRequest({ loanAmount: 5000, downPayment: 500, fromAccountId });
            cy.contains('Loan Request Processed').should('be.visible');
            cy.contains('Congratulations').should('be.visible');
        });
    });
});
