import { getFirstAccountId } from '../support/utils';

describe('Transfer Funds - Same Account Validation – UI + API', () => {

    beforeEach(() => {
        cy.initEnvironment();
        cy.login();
    });

	it('should not allow transferring funds to the same account', () => {
		getFirstAccountId().then((accountId) => {
			cy.contains('Transfer Funds').click();
            cy.url().should('include', '/parabank/transfer.htm');

			cy.get('#fromAccountId').select(accountId);
			cy.get('#toAccountId').select(accountId);
			cy.get('#amount').type('100');

			cy.intercept('POST', '**/transfer.htm').as('transferRequest');
			cy.get('input[value="Transfer"]').click();

			cy.contains('Unknown error message').should('be.visible'); // Nincs leirás és ismeretlen az elvárt eredmény

            cy.wait('@transferRequest').then((interception) => {
                expect(interception.response.statusCode).to.not.eq(200); // Szintén ismeretlen az elvárt eredmény ezért nem lehet jelenleg részletesebb assertálást irni
            });
		});
	});
});
