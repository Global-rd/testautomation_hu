describe("Profile update via API only", () => {
  beforeEach(() => {
    cy.loginWithAPI();
  });

  it("updates profile data via API", () => {
    const updatedBody = {
      firstName: "David Updated",
      lastName: "Test Updated",
      street: "streeting",
      city: "citying",
      state: "NY",
      zipCode: "34689",
      phoneNumber: "2323232323",
      ssn: "123-45-6789",
      username: Cypress.env("username"),
      password: Cypress.env("password"),
    };

    cy.request({
      method: "POST",
      url: "/parabank/services_proxy/bank/customers/update/20204",
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
      .and("have.value", updatedBody.lastName);

    cy.get('input[name="customer.phoneNumber"]').should(
      "have.value",
      updatedBody.phoneNumber
    );
  });
});
