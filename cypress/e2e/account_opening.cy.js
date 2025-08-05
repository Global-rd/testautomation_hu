import { openNewAccount } from '../support/utils';

describe('Account Opening – UI + API', () => {
	let accountId = null;

	beforeEach(() => {
		cy.initEnvironment();
		cy.login();
	});

	it('should open a new account and verify $3000 balance in UI and API', () => {
		openNewAccount('CHECKING').then((accountId) => {

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
