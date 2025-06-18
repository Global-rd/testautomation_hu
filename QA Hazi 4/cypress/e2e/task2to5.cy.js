describe("4. Házi feladat 2. - 5. pont", () => {
  beforeEach(() => {
    cy.visit("/"); // This runs before each test
  });

  // 2. Feladat

  it("Az első három termék ABC sorrendben van A-Z rendezés után", () => {
    cy.get(
      '[href="https://automationteststore.com/index.php?rt=product/category&path=43"]'
    ).click();

    // Válaszd ki az "A - Z" rendezést (feltételezve, hogy van ilyen opció)
    cy.get("select#sort").select("Name A - Z");
    // Várj, hogy a rendezés megtörténjen (ha szükséges, pl. 1 másodperc)
    cy.wait(1000);

    // Gyűjtsd ki az első három termék nevét
    cy.get(".fixed_wrapper .prdocutname").then(($els) => {
      const productNames = [...$els]
        .slice(0, 3)
        .map((el) => el.innerText.trim());
      // Ellenőrizd, hogy ABC sorrendben vannak-e
      const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));
      expect(productNames).to.deep.equal(sortedNames);
    });
  });

  // 3. Feladat

  it("Két különböző termék kosárba helyezése és ellenőrzés", () => {
    // 1. termék elkapása, ára, hozzáadás
    cy.get(
      ".thumbnails > :nth-child(1) > .fixed_wrapper > .fixed > .prdocutname"
    )
      .eq(0)
      .invoke("text")
      .then((name1) => {
        cy.get(
          ".thumbnails > :nth-child(1) > .thumbnail > .pricetag > .price > .oneprice"
        )
          .eq(0)
          .invoke("text")
          .then((price1Text) => {
            const price1 = parseFloat(price1Text.replace("$", "").trim());

            // 1. termék kosárba
            cy.get(
              ".thumbnails > :nth-child(1) > .thumbnail > .pricetag > .productcart > .fa"
            )
              .eq(0)
              .click();

            // 2. termék elkapása, ára, hozzáadás
            cy.get(
              ".thumbnails > :nth-child(1) > .fixed_wrapper > .fixed > .prdocutname"
            )
              .eq(1)
              .invoke("text")
              .then((name2) => {
                cy.get(
                  ".thumbnails > :nth-child(1) > .thumbnail > .pricetag > .price > .oneprice"
                )
                  .eq(1)
                  .invoke("text")
                  .then((price2Text) => {
                    const price2 = parseFloat(
                      price2Text.replace("$", "").trim()
                    );

                    // 2. termék kosárba
                    cy.get(
                      ".thumbnails > :nth-child(1) > .thumbnail > .pricetag > .productcart > .fa"
                    )
                      .eq(1)
                      .click();

                    // Kosár oldalra lépés
                    cy.get(".nav.topcart").click();

                    // Ellenőrzések

                    //1. Terméknév ellenőrzés
                    cy.get(
                      ".product-list > .table > tbody > :nth-child(2) > :nth-child(2)"
                    ).should("contain", name1.trim());
                    //2. Terméknév ellenőrzés
                    cy.get(
                      ".product-list > .table > tbody > :nth-child(3) > :nth-child(2)"
                    ).should("contain", name2.trim());
                    //1. Termékár ellenőrzés
                    cy.get(
                      ".product-list > .table > tbody > :nth-child(2) > :nth-child(6)"
                    )
                      .invoke("text")
                      .then((cartPrice1) => {
                        expect(
                          parseFloat(cartPrice1.replace("$", "").trim())
                        ).to.eq(price1);
                      });
                    //1. Termékár ellenőrzés
                    cy.get(
                      ".product-list > .table > tbody > :nth-child(3) > :nth-child(6)"
                    )
                      .invoke("text")
                      .then((cartPrice2) => {
                        expect(
                          parseFloat(cartPrice2.replace("$", "").trim())
                        ).to.eq(price2);
                      });

                    //1. Termékmennyiség ellenőrzés
                    cy.get("#cart_quantity50").should("have.value", "1");

                    //2. Termékmennyiség ellenőrzés
                    cy.get("#cart_quantity68").should("have.value", "1");

                    // Subtotal ellenőrzés
                    cy.get(
                      "#totals_table > tbody > :nth-child(1) > :nth-child(2)"
                    )
                      .invoke("text")
                      .then((subtotalText) => {
                        const expected = (price1 + price2).toFixed(2);
                        expect(subtotalText.replace("$", "").trim()).to.eq(
                          expected
                        );
                      });
                  });
              });
          });
      });
  });

  //4. feladat

  it("Pontosan 7 kategória van az oldalon", () => {
    cy.visit("https://automationteststore.com");
    // Megnezzuk hogy pontosan 7 darab fokategoriank van
    cy.get(".categorymenu > li .subcategories").should("have.length", 7);
  });

  //5. feladat
  //1. validacios hiba
  it("Üres mezőkkel való beküldés esetén, megjelennek-e a hibaüzenetek", () => {
    cy.get("#customer_menu_top").click();
    cy.get('[title="Continue"]').click();

    cy.get('button[title="Continue"]').click();
    cy.contains("First Name must be between 1 and 32 characters!").should(
      "be.visible"
    );
    cy.contains("Last Name must be between 1 and 32 characters!").should(
      "be.visible"
    );
    cy.contains("Email Address does not appear to be valid!").should(
      "be.visible"
    );
  });
  //2. validacios hiba
  it("Nem helyes email esetén megjelenik-e a hibaüzenet", () => {
    cy.get("#customer_menu_top").click();
    cy.get('[title="Continue"]').click();

    cy.get('input[name="firstname"]').type("Pelda");
    cy.get('input[name="lastname"]').type("Bela");
    cy.get('input[id="AccountFrm_email"]').type("asdasdasd");
    cy.get('input[name="address_1"]').type("Test Address ASD 1");
    cy.get('input[name="address_1"]').type("Test Address ASD 1");
    cy.get('select[name="zone_id"]').select("Aberdeen");
    cy.get('input[id="AccountFrm_postcode"]').type("123456");
    cy.get('input[name="loginname"]').type("loginname");
    cy.get('input[name="password"]').type("Password1");
    cy.get('input[name="agree"]').check();

    cy.get('button[title="Continue"]').click();

    cy.contains("Email Address does not appear to be valid!").should(
      "be.visible"
    );
  });
  //3. validacios hiba
  it("Túl rövid email esetén megjelenik-e a hibaüzenet", () => {
    cy.get("#customer_menu_top").click();
    cy.get('[title="Continue"]').click();

    cy.get('input[name="firstname"]').type("Pelda");
    cy.get('input[name="lastname"]').type("Bela");
    cy.get('input[id="AccountFrm_email"]').type("peldabela@gmail.com");
    cy.get('input[name="address_1"]').type("Test Address ASD 1");
    cy.get('select[name="zone_id"]').select("Aberdeen");
    cy.get('input[id="AccountFrm_postcode"]').type("123456");
    cy.get('input[name="loginname"]').type("loginname");
    cy.get('input[name="password"]').type("asd");
    cy.get('input[name="agree"]').check();

    cy.get('button[title="Continue"]').click();

    cy.contains("Password must be between 4 and 20 characters!");
  });
});
