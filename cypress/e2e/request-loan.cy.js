import { XMLParser } from 'fast-xml-parser';

describe('request loan', () => {

  beforeEach(() => {
    cy.login(Cypress.env('username'), Cypress.env('password'));
  });

  it('request loan available | loan amount only', () => {

    cy.contains('Request Loan').click();
    cy.url().should('include', '/requestloan.htm');
    cy.contains('Loan Amount').should('be.visible');
    cy.contains('Down Payment').should('be.visible');
    cy.get('input#amount').should('exist').and('be.visible');
    cy.get('input#downPayment').should('exist').and('be.visible');

    cy.get('input#amount').type('5000');
    cy.get('input#downPayment').should('have.value', '');
    cy.get('select#fromAccountId option').then(($options) => {
      const firstAccountId = $options[0].value;
      cy.get('select#fromAccountId').select(firstAccountId);
    });

    cy.get('input[value="Apply Now"]').click();

    // UI assertion
    cy.contains('Loan Request Processed').should('be.visible');

    cy.get('td#loanId')
      .should('exist')
      .invoke('text')
      .then((loanIdText) => {
          const loanId = parseInt(loanIdText.trim());
          expect(loanId).to.be.a('number');

    // API assertion
    cy.request(`/parabank/services/bank/loans/${loanId}`)
        .then((response) => {
            const parser = new XMLParser();
            const parsed = parser.parse(response.body);
            const loan = parsed.loan;

            expect(loan).to.exist;
            expect(Number(loan.id)).to.eq(loanId);
            expect(Number(loan.amount)).to.eq(loanAmount);
            expect(Number(loan.downPayment)).to.eq(0);
            });
        });
    });
});

