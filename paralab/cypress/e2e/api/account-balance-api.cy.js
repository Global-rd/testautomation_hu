describe("API – számlaegyenleg ellenőrzése", () => {
  let accountId;
  let username;
  let password;

  before(() => {
    // Beolvassuk a korábban regisztrált felhasználót és számlát
    cy.fixture("user").then((user) => {
      username = user.username;
      password = user.password;
    });

    cy.fixture("account").then((account) => {
      accountId = account.accountNumber;
    });
  });

  it("Számlaegyenleg 3000$ legyen API-n keresztül", () => {
    // 🔐 Bejelentkezés közvetlen requesttel
    cy.loginViaRequest(username, password);

    // 🔍 API hívás – számlaadatok lekérése
    cy.request({
      method: "GET",
      url: `/parabank/services/bank/accounts/${accountId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("balance");

      const balance = response.body.balance;

      cy.log(`Lekért egyenleg: $${balance}`);
      expect(balance).to.equal(3000);
    });
  });
});