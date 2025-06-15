describe('Vásárlás vendégként + hibaellenőrzés', () => {
  it('Vásárlás', () => {
    cy.visit('https://automationteststore.com/');
    cy.get('#filter_keyword').type('allegiant');
    cy.get('.button-in-search > .fa').click();
    cy.get('.cart').click();
    cy.get('#cart_checkout1 > .fa').click();
    cy.get('#accountFrm_accountguest').click();
    cy.get('#accountFrm > fieldset > .btn').click();
    cy.get('.btn-orange > .fa').click()
    //itt megnéztem dob e fel hibaüzenetet
    cy.get('.help-block').should('be.visible').and('contain', 'First Name must be greater than 3 and less than 32 characters!');
    cy.get('#guestFrm_firstname').type("Polla")
    cy.get('#guestFrm_lastname').type("Hauck")
    cy.get('#guestFrm_email').type("pollametta@gmail.com")
    cy.get('#guestFrm_address_1').type("Teszt út 32")
    cy.get('#guestFrm_city').type("Szeged")
    cy.get('#guestFrm_postcode').type("6725")
    cy.get('#guestFrm_zone_id').select('Bristol');
    cy.get('.btn-orange > .fa').click()
    //ez most ilyen fapados megoldás lesz
    cy.get('span.bold.totalamout').should('have.text', 'Total:$9.99');
    cy.get('#checkout_btn').click()
});
});