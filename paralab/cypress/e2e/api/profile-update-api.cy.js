beforeEach(() => {
  cy.registerUser();
});

it("API-n keresztüli profilfrissítés, majd UI-n ellenőrzés", () => {
  // 1️⃣ Belépés után kilistázzuk a userId-t a session alapján
  cy.getCookie("JSESSIONID").then((cookie) => {
    expect(cookie).to.exist;

    // 2️⃣ Lekérjük a jelenlegi felhasználói adatokat (ha szükséges)
    cy.request({
      method: "GET",
      url: "/parabank/services/bank/customers/current",
      headers: {
        Cookie: `JSESSIONID=${cookie.value}`,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);

      // 3️⃣ API kérés – profil frissítése
      const updatedData = {
        address: "API Street 123",
        city: "Tesztváros",
        state: "Tesztmegye",
        zipCode: "12345",
        phoneNumber: "123-456-7890",
      };

      cy.request({
        method: "POST",
        url: "/parabank/updateprofile.htm",
        headers: {
            Cookie: `JSESSIONID=${cookie.value}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        form: true,
        body: {
            "customer.address.street": updatedData.address,
            "customer.address.city": updatedData.city,
            "customer.address.state": updatedData.state,
            "customer.address.zipCode": updatedData.zipCode,
            "customer.phoneNumber": updatedData.phoneNumber,
        },
})
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.contain("Successfully updated customer profile");

        // 4️⃣ UI navigáció: Update Contact Info
        cy.contains("Update Contact Info").click();

        // 5️⃣ Ellenőrizzük, hogy a form mezők frissültek
        cy.get("input[name='customer.address.street']").should(
          "have.value",
          updatedData.address
        );
        cy.get("input[name='customer.address.city']").should(
          "have.value",
          updatedData.city
        );
        cy.get("input[name='customer.address.state']").should(
          "have.value",
          updatedData.state
        );
        cy.get("input[name='customer.address.zipCode']").should(
          "have.value",
          updatedData.zipCode
        );
        cy.get("input[name='customer.phoneNumber']").should(
          "have.value",
          updatedData.phoneNumber
        );
      });
    });
  });