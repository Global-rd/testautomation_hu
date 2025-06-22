describe("Guest Checkout Flow", () => {
    it("Complete checkout process as a guest", () => {
      // Visit the homepage
      cy.visit("/");
  
      // Search for a product and add it to the cart
      cy.get('#filter_keyword').type('shampoo{enter}');
      cy.get('.prdocutname').first().click();
      cy.get('a.cart').click();
  
      // Click on checkout button
      cy.get('#cart_checkout1').click();

      //Click the Guest Checkout radio button
      cy.get('#accountFrm_accountguest').click();

      //click the Continue button
      cy.get('button[title="Continue"]').click();
  
      // Fill out guest checkout information
      cy.get('#guestFrm_firstname').type('Test');
      cy.get('#guestFrm_lastname').type('User');
      cy.get('#guestFrm_email').type('testuser@example.com');
      cy.get('#guestFrm_address_1').type('123 Main St');
      cy.get('#guestFrm_city').type('New York');
      cy.get('#guestFrm_zone_id').select('Fife');
      cy.get('#guestFrm_postcode').type('10001');
      cy.get('#guestFrm_country_id').select('United States');
      cy.get('button[title="Continue"]').click();
  
      // Click the Confirm order button
      cy.get('button[title="Confirm Order"]').click();
  
      // Assert that order was placed successfully
      cy.get('.maintext').should('contain', 'Your Order Has Been Processed');
    });
  });
  