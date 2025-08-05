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