import {BaseService} from "./base-service";
import {AccountType} from "../model/Account";

export class NewAccountService extends BaseService {

    public createNewAccount(customerId: number, newAccountType: AccountType, fromAccountId: number): Cypress.Chainable<Cypress.Response<any>> {
        return cy.request({
            method: 'POST',
            url: `/services_proxy/bank/createAccount?customerId=${customerId}&fromAccountId=${fromAccountId}&newAccountType=${this.getAccountTypeId(newAccountType)}`,
        });
    }

    public verifyAccountCreated(response: Cypress.Response<any>, customerId: number, newAccountType: AccountType): void {
        expect(response.body).to.have.property('customerId');
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('type');
        expect(response.body).to.have.property('balance');
        expect(response.body['customerId']).to.equal(customerId);
        expect(response.body['type']).to.equal(newAccountType);
        expect(response.body['balance']).to.equal(0);
    }

    public verifyAccountExists(id: number, balance: number, type: AccountType): void {
        cy.request({
            method: 'GET',
            url: `/services_proxy/bank/accounts/${id}`
        }).then(response => {
            expect(response.body).to.have.property('customerId');
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('type');
            expect(response.body).to.have.property('balance');
            expect(response.body['type']).to.equal(type);
            expect(response.body['balance']).to.equal(balance);
        })
    }

    private getAccountTypeId(accountType: AccountType): number{
        switch(accountType){
            case AccountType.CHECKING:
                return 0;
            case AccountType.SAVINGS:
                return 1;
        }
    }


}