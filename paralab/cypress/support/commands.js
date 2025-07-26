Cypress.Commands.add("registerUser", () => {
  const password = "jelszo123";
  //nekem nem sikerült egy felhasználót regisztrálni, mert mindig kidobott, ezért készítettem egy epochon alapuló regisztrációt, így mindig új felhasználóval tudok regisztrálni előtte
  const timestamp = Date.now();
  const username = `user_${timestamp}`;

  cy.visit("/parabank/register.htm");

    cy.get("input[name='customer.firstName']").type("Teszt");
    cy.get("input[name='customer.lastName']").type("Felhasználó");
    cy.get("input[name='customer.address.street']").type("Teszt utca 123");
    cy.get("input[name='customer.address.city']").type("Budapest");
    cy.get("input[name='customer.address.state']").type("BP");
    cy.get("input[name='customer.address.zipCode']").type("1234");
    cy.get("input[name='customer.phoneNumber']").type("123456789");
    cy.get("input[name='customer.ssn']").type("123456789");

    cy.get("input[name='customer.username']").type(username);
    cy.get("input[name='customer.password']").type(password);
    cy.get("input[name='repeatedPassword']").type(password);

    cy.get('[colspan="2"] > .button').click();
    cy.contains("Your account was created successfully. You are now logged in.").should("exist");
    
    cy.writeFile("cypress/fixtures/user.json", {
      username: username,
      password: password
    });
  });

Cypress.Commands.add("login", (username, password) => {
  cy.visit("/parabank/index.htm");
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('input[type="submit"]').click();
});

Cypress.Commands.add("loginViaRequest", (username, password) => {
  return cy.request({
    method: "POST",
    url: "/parabank/login.htm",
    form: true,
    body: {
      username,
      password,
    },
  }).then((response) => {
    expect(response.status).to.eq(200); // megbízható visszajelzés
  });
});