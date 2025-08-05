import { openNewAccount, getFirstAccountId } from '../support/utils';

describe('Overdraft Transfer Funds – UI + API', () => {
	let fromAccountId;
	let toAccountId;

	beforeEach(() => {
		cy.initEnvironment();
		cy.login();
	});

	it('should allow overdraft transfer and reflect negative balance in UI and API', () => {
		getFirstAccountId().then((fromId) => {
			fromAccountId = fromId;
			openNewAccount('CHECKING').then((toId) => {
				toAccountId = toId;

				cy.contains('Transfer Funds').click();

				cy.url().should('include', '/parabank/transfer.htm');
				cy.get('#fromAccountId').find('option').should('contain', fromAccountId);
				cy.get('#toAccountId').find('option').should('contain', toAccountId);

				cy.get('#amount').type('4000');
				cy.get('#fromAccountId').select(fromAccountId);
				cy.get('#toAccountId').select(toAccountId);
				cy.get('input[value="Transfer"]').click();

				cy.contains('Transfer Complete!').should('be.visible');

				cy.contains('Accounts Overview').click();
				cy.get('#accountTable')
					.contains('a', fromAccountId)
					.parents('tr')
					.find('td').eq(1)
					.invoke('text')
					.then((balanceText) => {
						const balance = parseFloat(balanceText.replace('$', ''));
						expect(balance).to.be.lessThan(0);
					});

				cy.request({
					method: 'GET',
					url: `/parabank/services/bank/accounts/${fromAccountId}`,
					headers: {
						accept: 'application/json',
					},
				}).then((res) => {
					expect(res.status).to.eq(200);
					expect(res.body).to.have.property('id', Number(fromAccountId));
					expect(res.body).to.have.property('balance');
					expect(res.body.balance).to.be.lessThan(0);
				});
			});
		});
	});
});
