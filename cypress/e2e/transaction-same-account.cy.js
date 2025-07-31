describe('open SAVINGS account', () => {

    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'));
    });

    it('transaction on same account - UI', () => {

        cy.contains('Transfer Funds').click();

        cy.get('select#fromAccountId option').then($options => {
            const validOptions = [...$options].map(o => o.value).filter(v => v);
            expect(validOptions.length).to.be.greaterThan(0);

            const accountId = validOptions[0];

        cy.transferFunds(accountId, accountId, '100');

        // UI assertion
        cy.get('.error').should('contain.text', 'cannot transfer to the same account');
        });
    });
    it('transaction on same account - API', () => {
        
        const baseUrl = Cypress.env('baseUrl');

        cy.request({
            method: 'POST',
            url: `${baseUrl}/parabank/services_proxy/bank/transfer`,
            form: true,
            failOnStatusCode: false,
            body: {
            fromAccountId: Cypress.env('accountId'),
            toAccountId: Cypress.env('accountId'),
            amount: 100
            }
        //API assertion
        }).then((res) => {
            expect(res.status).to.be.oneOf([400, 422, 500]);
            expect(res.body).to.include('same account');
        });
    });

});
