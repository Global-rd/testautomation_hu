describe('Account Opening – UI + API', () => {
	let accountId = null;

	beforeEach(() => {
		cy.initEnvironment();
		cy.login();
	});

	it('should open a new account and verify $3000 balance in UI and API', () => {
		cy.contains('Open New Account').click();
		cy.contains('What type of Account would you like to open?').should('be.visible');
		cy.get('#type').select('CHECKING');
		cy.get('#fromAccountId').find('option').should('have.length.greaterThan', 0);
		cy.get('input[value="Open New Account"]').click();
		cy.contains('Account Opened!').should('be.visible');

		cy.get('#newAccountId')
		.should('be.visible')
		.and('not.be.empty')
		.then(($el) => {
			accountId = $el.text().trim();

			cy.contains('Accounts Overview').click();
      cy.get('#accountTable')
        .find('tbody tr')
        .contains('a', accountId)
        .parents('tr')
        .within(() => {
          cy.get('td').eq(1).should('contain.text', '$3000.00');
        });

			cy.request({
			method: 'GET',
			url: `/parabank/services/bank/accounts/${accountId}`,
			headers: {
				accept: 'application/json',
			},
			}).then((res) => {
			expect(res.status).to.eq(200);
			expect(res.body).to.have.property('balance', 3000);
			expect(res.body).to.have.property('id', Number(accountId));
			});
		});
	});
});
