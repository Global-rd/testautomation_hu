describe("Exercise 5: Update Profile - via API only", () => {
  beforeEach(() => {
    cy.loginToParaBank();
  });

  it("should update the profile without using UI", () => {
    // Step 1: Retrieve current user information to determine what needs updating
    cy.intercept("GET", "*/services_proxy/bank/customers/*").as("getCustomer");
    cy.visit("updateprofile.htm");

    cy.wait("@getCustomer").then((interception) => {
      // Step 2: We extract the customer ID from the Request URL
      const customerId = interception.request.url.match(/customers\/(\d+)/)[1];
      cy.log(`customer id: ${customerId}`, { customerId });

      // Step 3: Prepare updated profile data
      const currentProfile = interception.response.body;
      const newFirstName = "ApiUpdated";
      const newLastName = "NoUITest";
      const newPhoneNumber = "111-API-TEST";
      cy.log(JSON.stringify(currentProfile));

      // Step 4: Build the URL with all parameters
      const updateUrl =
        `/services_proxy/bank/customers/update/${customerId}?` +
        `firstName=${newFirstName}&` +
        `lastName=${newLastName}&` +
        `street=${currentProfile.address.street}&` +
        `city=${currentProfile.address.city}&` +
        `state=${currentProfile.address.state}&` +
        `zipCode=${currentProfile.address.zipCode}&` +
        `phoneNumber=${newPhoneNumber}&` +
        `ssn=${currentProfile.ssn}&` +
        `username=${Cypress.env("USERNAME")}&` +
        `password=${Cypress.env("PASSWORD")}`;

      cy.request({
        method: "POST",
        url: updateUrl,
        headers: { "Content-Type": "application/json" },
        failOnStatusCode: false,
      }).then((updateResponse) => {
        cy.log(`Update Response Status: ${updateResponse.status}`);
        cy.log(`Update Response: ${JSON.stringify(updateResponse.body)}`);

        // Verify required API response message
        if (updateResponse.status === 200) {
          if (updateResponse.body && updateResponse.body.message) {
            expect(updateResponse.body.message).to.equal(
              "Successfully updated customer profile"
            );
          }
        }

        // Step 5: Verify changes appear in Update Contact Info UI
        cy.visit("updateprofile.htm");
        cy.get('input[name="customer.firstName"]').should(
          "have.value",
          newFirstName
        );
        cy.get('input[name="customer.lastName"]').should(
          "have.value",
          newLastName
        );
        cy.get('input[name="customer.phoneNumber"]').should(
          "have.value",
          newPhoneNumber
        );
      });
    });
  });
});
