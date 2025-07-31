describe('update profile with API', () => {

  let profileData;

  beforeEach(() => {

    cy.fixture('profile').then((data) => {
      profileData = {
        ...data,
        customerId: Cypress.env('customerId'),
        username: Cypress.env('username'),
        password: Cypress.env('password')
      };
    });
    const username = Cypress.env('username');
    const password = Cypress.env('password');
    cy.login(username, password);
  });
  it('update profile with API | UI assertion', () => {

    // Frissítés API-n keresztül
    cy.updateProfile(profileData).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.contain('Successfully updated customer profile');
    });

      // UI ellenőrzés
      cy.contains('Update Contact Info').click();

      cy.get('input[name="customer.address.street"]').should('have.value', profileData.street);
      cy.get('input[name="customer.address.city"]').should('have.value', profileData.city);
      cy.get('input[name="customer.address.state"]').should('have.value', profileData.state);
      cy.get('input[name="customer.address.zipCode"]').should('have.value', profileData.zipCode);
      cy.get('input[name="customer.phoneNumber"]').should('have.value', profileData.phoneNumber);
    });
  });