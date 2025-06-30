describe("Automation Test Store", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#customer_menu_top").should("be.visible"); //asszert az oldal betöltésére
  });

  it("Test for product list sorting", () => {
    cy.get(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=43"]'
    ).click(); //link keresése a megfelelő attribútummal és kattintás
    cy.get("#sort").select("pd.name-ASC");
    cy.get("a.prdocutname").first().should("be.visible"); //assert, hogy az első termék látható

    let productTitles = [];
    cy.get("a.prdocutname")
      .each(($element) => {
        // minden termék elemre végrehajtja a következő műveleteket
        const title = $element.attr("title"); // kinyerjük a 'title' attribútum értékét
        if (title) {
          let trimmedTitle = title.trim(); // levágja a felesleges szóközöket
          productTitles.push(trimmedTitle); //feltölti a tömböt az elemekkel
        }
      })
      .then(() => {
        expect(productTitles).to.not.be.empty; //ellenőrizzük, hogy a lista nem üres
        const sortedProductTitles = [...productTitles].sort(); // másolat és rendezés
        sortedProductTitles.forEach((title) => cy.log(title)); //log a terméknevekről
        expect(productTitles).to.deep.equal(sortedProductTitles); //assert, hogy a terméknevek rendezettek
      });
  });

  it("Shopping cart feature testing", () => {
    cy.get(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=58"]'
    ).click(); // 'MEN' kategória megnyitása
    cy.contains("span.maintext", "Men").should("be.visible"); // Megnyílt Men kategória látható

    cy.get('.pricetag.jumbotron a[data-id="76"]').click();
    cy.get('.pricetag.jumbotron a[data-id="77"]').click();

    var price1 = -1;
    cy.get('a[data-id="76"]') // 76-os id-jú termék
      .closest(".pricetag.jumbotron") // szülő konténer
      .find(".oneprice") // megkeressük benne az árat tartalmazó elemet
      .invoke("text") // kinyerjük a szöveges tartalmát $...
      .then((priceText) => {
        const priceAsNumber = parseFloat(priceText.replace("$", "").trim()); // számra alakítás

        price1 = priceAsNumber;
        cy.wrap(price1).as("price1"); // mentés aliasként
      });

    var price2 = -1;
    cy.get('a[data-id="77"]') // 77-os id-jú termék
      .closest(".pricetag.jumbotron") // szülő konténer
      .find(".oneprice") // megkeressük benne az árat tartalmazó elemet
      .invoke("text") // kinyerjük a szöveges tartalmát $...
      .then((priceText) => {
        const priceAsNumber = parseFloat(priceText.replace("$", "").trim()); // számra alakítás

        price2 = priceAsNumber;
        cy.wrap(price2).as("price2"); // mentés aliasként
      });

    cy.get("@price1").then((p1) => {
      cy.get("@price2").then((p2) => {
        const totalPrice = p1 + p2;
        cy.wrap(totalPrice).as("totalPrice");
      });
    });
    cy.get("@totalPrice").then((p1) => {
      cy.log("Total Price: " + p1); // log teljes ár
    });

    cy.contains("span.menu_text", "Cart").click({ force: true }); // kattintás a kosár menüpontra
    cy.contains("span.maintext", " Shopping Cart").should("be.visible"); // megnyílt a kosár oldal, assert

    cy.get("#totals_table tr")
      .find("td")
      .eq(1)
      .invoke("text")
      .then((priceText) => {
        const subtotal = parseFloat(priceText.replace("$", "").trim()); // számra alakítás
        cy.get("@totalPrice").then(($totalPrice) => {
          expect(subtotal).to.equal($totalPrice); // ellenőrizzük, hogy a kosárban lévő árak összege megegyezik-e a várt összeggel
        });
      });
  });

  it("Product categories", () => {
    cy.get("#categorymenu > nav > ul > li")
      .not(":has(a.menu_home)") // category menü fő konténerben listaelemek adott szintig, Home menü nélkül
      .should("have.length", 7);
  });


it("Registration form error handling", () => {
  //cy.get('a[href="https://automationteststore.com/index.php?rt=account/login"]').click();
  cy.contains('a', 'Login or register').click();
  cy.contains('span', 'Account Login').should("be.visible");
  cy.contains('button[type="submit"]', 'Continue').click();
  cy.get('button[type="submit"][title="Continue"]').click();
  cy.contains("Error: You must agree to the Privacy Policy!").should("be.visible"); // hibaüzenet ellenőrzése

});

});