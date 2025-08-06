import { getCustomerId, updateUserProfile } from '../support/utils';

describe('Update profile datas with API and verify on UI', () => {
    beforeEach(() => {
        cy.initEnvironment();
        cy.login();
    });

    it('should update profile with API and assert changes in UI', () => {
        cy.fixture('profileData').then((updatedProfileData) => {
            getCustomerId().then((customerId) => {
                cy.log(updatedProfileData)
                updateUserProfile(customerId, updatedProfileData);

                cy.contains('Update Contact Info').click();
                cy.get('input[name="customer.firstName"]').should('have.value', updatedProfileData.firstName);
                cy.get('input[name="customer.lastName"]').should('have.value', updatedProfileData.lastName);
                cy.get('input[name="customer.address.street"]').should('have.value', updatedProfileData.address);
                cy.get('input[name="customer.address.city"]').should('have.value', updatedProfileData.city);
                cy.get('input[name="customer.address.state"]').should('have.value', updatedProfileData.state);
                cy.get('input[name="customer.address.zipCode"]').should('have.value', updatedProfileData.zipCode);
                cy.get('input[name="customer.phoneNumber"]').should('have.value', updatedProfileData.phoneNumber);
            });
        });
    });
});
