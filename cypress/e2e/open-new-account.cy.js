import { XMLParser } from "fast-xml-parser";

describe('open new account', () => {

  beforeEach(() => {
    cy.login(Cypress.env('username'), Cypress.env('password'));
  });

it('open new account on UI | UI + API assertion', () => {
    
    cy.contains('Open New Account').click();

    cy.get('#fromAccountId option').then($options => {
    const firstAccountId = $options.first().val();
    cy.openNewAccount('CHECKING', firstAccountId);
    });
    
    // UI assertion
    cy.get('#newAccountId')
      .should('be.visible')
      .invoke('text')
      .then((accountId) => {
        cy.contains('Accounts Overview').click();
        cy.contains(accountId)
          .parents('tr')
          .within(() => {
            cy.get('td').eq(1).should('contain', '3000.00');
          });

    // API assertion      
    cy.request(`/parabank/services/bank/accounts/${accountId}`)
      .then((response) => {
      const parser = new XMLParser();
      const parsed = parser.parse(response.body);
      const account = parsed.account;

      expect(account.id).to.eq(Number(accountId));
      expect(Number(account.balance)).to.eq(3000);
      expect(account.type).to.eq('CHECKING');
      });
    });
  });
});
