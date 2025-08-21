import {User} from "../model/User";

export class UserService {

    private registerUrl: string = '/register.htm';

    async seedData(testUser: User): Promise<any> {
        cy.visit(this.registerUrl);

        cy.get('#customer\\.firstName').type(testUser.firstName);
        cy.get('#customer\\.lastName').type(testUser.lastName);
        cy.get('#customer\\.address\\.street').type(testUser.address.street);
        cy.get('#customer\\.address\\.city').type(testUser.address.city);
        cy.get('#customer\\.address\\.state').type(testUser.address.state);
        cy.get('#customer\\.address\\.zipCode').type(testUser.address.zipCode);
        cy.get('#customer\\.phoneNumber').type(testUser.address.phoneNumber);
        cy.get('#customer\\.ssn').type(testUser.ssn);
        cy.get('#customer\\.username').type(testUser.username);
        cy.get('#customer\\.password').type(testUser.password);
        cy.get('#repeatedPassword').type(testUser.password);
        cy.get('[value="Register"]').click();
    }

    resetData(): void {
        cy.request({
            method: 'POST',
            url: 'db.htm',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'action=CLEAN'
        });

        cy.request({
            method: 'POST',
            url: 'db.htm',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'action=INIT'
        });
    }
}