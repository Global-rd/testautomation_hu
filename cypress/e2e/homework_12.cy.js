// 2. Terméklista rendezés teszt //
describe("Skin Care A to Z sorting test", () => {
  it("should have products in alphabetical order after selecting Name A - Z", () => {
    cy.visit("/index.php?rt=product/category&path=43");
    // megvárjuk az oldalt és a terméklistát
    cy.get("#sort").should("be.visible");

    // kiválasztjuk az "A - Z" opciót a Sort By dropdown-ból
    cy.get("#sort").select("Name A - Z");

    // kiválasztja az összes termék nevét, amik az oldalon a .prdocutname class alatt vannak és belépünk egy .then() callbackbe (ahol hozzáférünk az összes DOM elemhez)
    cy.get(".fixed_wrapper .prdocutname").then(($products) => {
      const productNames = [...$products]
        .slice(0, 3) // csak az első három elemet tartja meg
        .map((el) => el.innerText.trim()); // minden elemből kiszedjük a belső szöveget és trimmeljük a fölösleges szóközöket

      const sorted = [...productNames].sort((a, b) => a.localeCompare(b)); // lemásoljuk a productNames tömböt, hogy ne az eredetit módosítsuk, majd ABC sorba rendezzük

      expect(productNames).to.deep.equal(sorted); // összehasonlítjuk az eredeti tömböt a sorba rendezettel
    });
  });
});

// 3. Kosár funkciók tesztelése //
describe("Cart functionality test", () => {
  beforeEach(() => {
    cy.visit("/index.php?rt=product/category&path=43");
  });
  it("should display correct product names, prices and quantities on the cart site", () => {
    // első termék hozzáadása
    cy.contains(".prdocutname", "Absolue Eye Precious Cells")
      .closest(".fixed_wrapper")
      .siblings(".thumbnail")
      .find(".productcart")
      .click();

    // második termék hozzáadása
    cy.contains(
      ".prdocutname",
      "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15"
    )
      .closest(".fixed_wrapper")
      .siblings(".thumbnail")
      .find(".productcart")
      .click();
    cy.get(".nav.topcart .dropdown.hover").trigger("mouseover");

    // első terméknév ellenőrzése
    cy.get("#top_cart_product_list .name a")
      .eq(0)
      .should("contain", "Absolue Eye Precious Cells");

    // első termék árának ellenőrzése
    cy.get("#top_cart_product_list tr")
      .eq(0)
      .find(".total")
      .should("contain", "$89.00");

    // második terméknév ellenőrzése
    cy.get("#top_cart_product_list .name a")
      .eq(1)
      .should(
        "contain",
        "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15"
      );

    // második termék árának ellenőrzése
    cy.get("#top_cart_product_list tr")
      .eq(1)
      .find(".total")
      .should("contain", "$42.00");

    // darabszám mindkét terméknél = 1
    cy.get("#top_cart_product_list tr")
      .eq(0)
      .find(".quantity")
      .should("contain", "1");
    cy.get("#top_cart_product_list tr")
      .eq(1)
      .find(".quantity")
      .should("contain", "1");

    // subtotal = 89 + 42 = 131.00
    cy.get("#top_cart_product_list .totals .cart_block_total").should(
      "contain",
      "131.00"
    );
  });
});

// 4. Termék kategóriák //

describe("Product categories", () => {
  it("should have 7 product categories", () => {
    cy.visit("/index.php?rt=product/category&path=43");
    cy.get("#categorymenu .categorymenu > li > a") // a categorymenu ID-n belül található categorymenu class alatt közvetlen elhelyezkedő li elemet és a li elem alatt közvetlen elhelyezkedő a elemet keressük meg
      .not(".menu_home") // kivéve a home elemet
      .should("have.length", 7); // 7 darabnak kell lennie
  });
});

// 5. Regisztrációs űrlap hibakezelése //
describe("Registration form error handling", () => {
  beforeEach(() => {
    // minden teszt futtatásnál meghívjuk ezt az oldalt
    cy.visit("/index.php?rt=account/create");
  });

  // üres form elküldése
  it("should throw errors for an empty form", () => {
    cy.get("#AccountFrm button[type='submit']").click(); // elküldjük a formot üresen
    cy.get("#AccountFrm .form-group.has-error").should("have.length", 9); // 9 db hibaüzenet kell, hogy megjelenjen a formon belül
    cy.get("#maincontainer .alert.alert-error").should(
      "contain.text",
      "Error: You must agree to the Privacy Policy!"
    ); // a 10. hibaüzenet, ami a formon kívül található
  });

  // kötelező mezők kitöltése valid adatokkal és érvénytelen email-lel
  it("should throw an error for invalid email", () => {
    cy.get("input#AccountFrm_firstname").type("Elek");
    cy.get("input#AccountFrm_lastname").type("Teszt");
    cy.get("input#AccountFrm_email").type("something@.com");
    cy.get("input#AccountFrm_address_1").type("221B Baker Street");
    cy.get("input#AccountFrm_city").type("London");
    cy.get("select#AccountFrm_zone_id").select("Greater London");
    cy.get("input#AccountFrm_postcode").type("NW1 6XE");
    cy.get("input#AccountFrm_loginname").type("tesztelek");
    cy.get("input#AccountFrm_password").type("Teszt1234!");
    cy.get("input#AccountFrm_confirm").type("Teszt1234!");
    cy.get("input#AccountFrm_agree").check();
    cy.get("#AccountFrm button[type='submit']").click();
    cy.get("#AccountFrm .form-group.has-error").should("have.length", 1); // 1 db hibaüzenet kell, hogy megjelenjen a formon belül az E-Mail mezőnél
    cy.get("#maincontainer .alert.alert-error").should(
      // ugyanaz a hibaüzenet, csak a formon kívül is megjelenítve
      "contain.text",
      "Email Address does not appear to be valid!"
    );
  });

  // kötelező mezők kitöltése valid adatokkal és a Password Confirm mező üresen hagyása
  it("should throw an error for not confirming the password", () => {
    cy.get("input#AccountFrm_firstname").type("John");
    cy.get("input#AccountFrm_lastname").type("Doe");
    cy.get("input#AccountFrm_email").type("john_doe_test@gmail.com");
    cy.get("input#AccountFrm_address_1").type("221B Baker Street");
    cy.get("input#AccountFrm_city").type("London");
    cy.get("select#AccountFrm_zone_id").select("Greater London");
    cy.get("input#AccountFrm_postcode").type("NW1 6XE");
    cy.get("input#AccountFrm_loginname").type("johndoetest99");
    cy.get("input#AccountFrm_password").type("Something12@");
    cy.get("input#AccountFrm_agree").check();
    cy.get("#AccountFrm button[type='submit']").click();
    cy.get("#AccountFrm .form-group.has-error").should("have.length", 1); // 1 db hibaüzenet kell, hogy megjelenjen a formon belül a Password Confirm mezőnél
    cy.get("#maincontainer .alert.alert-error").should(
      // ugyanaz a hibaüzenet, csak a formon kívül is megjelenítve
      "contain.text",
      "Password confirmation does not match password!"
    );
  });

  // kötelező mezők kitöltése valid adatokkal és a Privacy Policy checkbox üresen hagyása
  it("should throw an error for not accepting the Privacy Policy", () => {
    cy.get("input#AccountFrm_firstname").type("Emma");
    cy.get("input#AccountFrm_lastname").type("Johnson");
    cy.get("input#AccountFrm_email").type("emma.johnson@example.co.uk");
    cy.get("input#AccountFrm_address_1").type("18 Oxford Street");
    cy.get("input#AccountFrm_city").type("London");
    cy.get("select#AccountFrm_zone_id").select("Greater London");
    cy.get("input#AccountFrm_postcode").type("W1D 1AN");
    cy.get("input#AccountFrm_loginname").type("haveyoumetemma");
    cy.get("input#AccountFrm_password").type("T3st53");
    cy.get("input#AccountFrm_confirm").type("T3st53");
    cy.get("#AccountFrm button[type='submit']").click();
    cy.get("#maincontainer .alert.alert-error").should(
      // elvárt hibaüzenet
      "contain.text",
      "Error: You must agree to the Privacy Policy!"
    );
  });
});
