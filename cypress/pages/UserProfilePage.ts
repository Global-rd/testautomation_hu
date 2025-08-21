import {BasePage} from "./BasePage";

export class UserProfilePage extends BasePage{

    baseUrl = 'updateprofile.htm';

    selectors = {
        firstName: '#customer\\.firstName',
        lastName: '#customer\\.lastName',
        street: '#customer\\.address\\.street',
        city: '#customer\\.address\\.city',
        state: '#customer\\.address\\.state',
        zipCode: '#customer\\.address\\.zipCode',
        phoneNumber: '#customer\\.phoneNumber',
        button: '[value="Update Profile"]'
    }

    verifyFieldValue(fieldName: string, value: string): void {
        cy.get(this.selectors[fieldName]).should('be.visible').should('have.value', value);
    }

}