import {BaseService} from "./base-service";

export class RequestLoanService extends BaseService {

    requestLoan(customerId: number, fromAccountId: number, downPayment: number, amount: number): Cypress.Chainable<Cypress.Response<any>> {
        return cy.request({
            method: 'POST',
            url: `services_proxy/bank/requestLoan?customerId=${customerId}&fromAccountId=${fromAccountId}&amount=${amount}&downPayment=${downPayment}`
        });
    }
}