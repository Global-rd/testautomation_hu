Cypress.Commands.add('login', () => {
	cy.fixture('testUser').then((user) => {
		cy.visit('/parabank/index.htm');
		cy.get('input[name="username"]').type(user.username);
		cy.get('input[name="password"]').type(user.password);
		cy.get('input[value="Log In"]').click();

		cy.contains('Account Services').should('be.visible');
	});
});
