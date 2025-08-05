export function openNewAccount(type = 'CHECKING') {
    cy.contains('Open New Account').click();
	cy.contains('What type of Account would you like to open?').should('be.visible');
    cy.get('#type').select(type);
	cy.get('#fromAccountId').find('option').should('have.length.greaterThan', 0);
    cy.get('input[value="Open New Account"]').click();
	cy.contains('Account Opened!').should('be.visible');

    return cy.get('#newAccountId')
        .should('be.visible')
        .and('not.be.empty')
        .invoke('text')
        .then((text) => text.trim());
}

export function getFirstAccountId() {
    cy.contains('Accounts Overview').click();
    return cy.get('#accountTable tbody tr').first().find('td a').invoke('text');
}

export function submitLoanRequest({ loanAmount = '', downPayment = '', fromAccountId }) {
    cy.contains('Request Loan').click();
    cy.get('form').should('be.visible');

    if (loanAmount !== '') { cy.get('#amount').clear().type(loanAmount.toString()); }
    if (downPayment !== '') { cy.get('#downPayment').clear().type(downPayment.toString()); }

    cy.get('#fromAccountId').select(fromAccountId);
    cy.intercept('POST', '**/requestLoan**').as('loanRequest');
    cy.get('input[value="Apply Now"]').click();

    cy.wait('@loanRequest').then((interception) => {
    expect(interception.response.statusCode).to.eq(200);

    const body = interception.response.body;
    expect(body).to.have.property('approved', true);
    expect(body).to.have.property('loanProviderName').and.to.be.a('string');
    expect(body).to.have.property('accountId'); 
    });
}
