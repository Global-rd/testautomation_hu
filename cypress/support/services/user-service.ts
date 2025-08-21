import {User} from "../model/User";

export class UserService {

    private user: User;

    private registerUrl: string = '/register.htm';

    get currentUser(): User {
        return this.user;
    }

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

    // async cleanUpData(): Promise<void>{
    //     const url = 'http://localhost:8080/parabank/db';
    //
    //     // Clean up
    //     await fetch(url, {
    //         method: 'POST',
    //         body: 'action=CLEAN'
    //     });
    //
    //     // Initialize
    //     await fetch(url, {
    //         method: 'POST',
    //         body: 'action=INIT'
    //     });
    // }
}