import { openNewAccount } from '../support/utils';

describe('Open savings Account – UI + API', () => {
  let accountId = null;

  beforeEach(() => {
	cy.initEnvironment();
    cy.login();
  });

  it('should open a SAVINGS account and verify it in UI and API', () => {
    openNewAccount('SAVINGS').then((accountId) => {

        cy.contains('Accounts Overview').click();

        cy.get('#accountTable')
          .find('tbody tr')
          .contains('a', accountId)
          .click();

        cy.contains('Account Details').should('be.visible');
        cy.contains('SAVINGS').should('be.visible');
        cy.contains(accountId).should('be.visible');

        
        cy.request({
          method: 'GET',
          url: `/parabank/services/bank/accounts/${accountId}`,
          headers: {
            accept: 'application/json',
          },
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.property('id', Number(accountId));
          expect(res.body).to.have.property('type', 'SAVINGS');
        });
      });
  });
});
