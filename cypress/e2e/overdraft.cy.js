import { XMLParser } from "fast-xml-parser";

describe('overdraft test', () => {

  beforeEach(() => {
    cy.login(Cypress.env('username'), Cypress.env('password'));
  });

  it('overdraft test | UI + API assertion', () => {
    cy.contains('Accounts Overview').click();

    cy.get('table').contains('td', 'Balance').should('exist');

    cy.get('table tbody tr')
      .then(($rows) => {
        const fromRow = $rows[1];
        const toRow = $rows[0];

        const fromAccountId = Cypress.$(fromRow).find('td a').text();
        const fromBalanceText = Cypress.$(fromRow).find('td').eq(1).text().trim().replace('$', '');
        const fromBalance = parseFloat(fromBalanceText);

        const toAccountId = Cypress.$(toRow).find('td a').text();

        const transferAmount = fromBalance + 50;

        cy.contains('Transfer Funds').click();
        cy.get('#amount').clear().type(transferAmount.toString());
        cy.get('#fromAccountId').select(fromAccountId);
        cy.get('#toAccountId').select(toAccountId);
        cy.get('input[value="Transfer"]').click();

        cy.contains('Accounts Overview').click();

        cy.contains(fromAccountId)
          .parents('tr')
          .within(() => {
            cy.get('td').eq(1).invoke('text').then((text) => {
              const updatedBalance = parseFloat(text.replace('$', ''));
              expect(updatedBalance).to.be.lessThan(0);
            });
          });

        cy.request(`/parabank/services/bank/accounts/${fromAccountId}`)
          .then((response) => {
            const parser = new XMLParser();
            const account = parser.parse(response.body).account;

            expect(account.id).to.eq(Number(fromAccountId));
            expect(Number(account.balance)).to.be.lessThan(0);
          });
      });
  });
});
