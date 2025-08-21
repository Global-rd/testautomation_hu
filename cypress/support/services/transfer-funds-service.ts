import {BaseService} from "./base-service";

export class TransferFundsService extends BaseService{

    transfer(fromAccountId: number, toAccountId: number, amount: number): Cypress.Chainable<Cypress.Response<any>> {
        return cy.request({
            method: 'POST',
            url: `services_proxy/bank/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${amount}`
        });
    }

    verifyBalance(defaultUserAccountId: number, number: number): void {
        cy.request({
            method: 'GET',
            url: `services_proxy/bank/accounts/${defaultUserAccountId}`,
        }).then(response => {
            expect(response.body).to.have.property('customerId');
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('type');
            expect(response.body).to.have.property('balance');
            expect(response.body['balance']).to.equal(number);
        });
    }
}