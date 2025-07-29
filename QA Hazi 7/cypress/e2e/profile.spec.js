describe("Profile update via API only", () => {
  beforeEach(() => {
    cy.loginViaAPI();
  });

  it("updates contact info through API and reflects on UI", () => {
    const updated = {
      firstName: "John",
      lastName: "Doe",
      street: "1 Infinite Loop",
      city: "Cupertino",
      state: "CA",
      zipCode: "95014",
      phoneNumber: "555-0000",
      ssn: "622-11-9999",
      username: Cypress.env("username"),
      password: Cypress.env("password"),
    };

    cy.request({
      method: "POST",
      url: "/parabank/services_proxy/bank/customers/update/12656",
      form: true,
      body: updated,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include("Successfully updated");
    });

    cy.visit("/");
    cy.contains("Update Contact Info").click();

    cy.get('input[name="customer.lastName"]', { timeout: 2000 })
      .should("be.visible")
      .and("have.value", updated.lastName);

    cy.get('input[name="customer.phoneNumber"]').should(
      "have.value",
      updated.phoneNumber
    );
  });
});
