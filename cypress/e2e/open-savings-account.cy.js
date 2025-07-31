import { XMLParser } from "fast-xml-parser";

describe('open SAVINGS account', () => {

  beforeEach(() => {
    cy.login(Cypress.env('username'), Cypress.env('password'));
  });

it('open SAVINGS account on UI | UI + API assertion', () => {

    cy.contains('Open New Account').click();

    cy.get('#fromAccountId option').then($options => {
    const firstAccountId = $options.first().val();
    cy.openNewAccount('SAVINGS', firstAccountId);
    });

    // UI assertion
    cy.get('#newAccountId')
      .should('be.visible')
      .invoke('text')
      .then((accountId) => {
        cy.contains('Accounts Overview').click();
        cy.contains(accountId).click();
        cy.get('#accountType').should('be.visible').and('have.text','SAVINGS');

    // API assertion
    cy.request(`/parabank/services/bank/accounts/${accountId}`)
      .then((response) => {
      const parser = new XMLParser();
      const parsed = parser.parse(response.body);
      const account = parsed.account;

      expect(account.id).to.eq(Number(accountId));
      expect(account.type).to.eq('SAVINGS');
      });
    });
  });
});
