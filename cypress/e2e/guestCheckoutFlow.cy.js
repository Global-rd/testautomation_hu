import { logRunMode } from "../utils/runModeCheck"; // beimportáljuk a runModeCheck.js fájlt, amivel ellenőrizzük, hogy milyen módban fut a Cypress (GUI vs Headless)

it("checks run mode", () => {
  logRunMode();
});

// 6. Önálló E2E teszt: Vásárlás vendégként + hibaellenőrzés //
describe("Shopping as a guest", () => {
  it("should be able to place an order as a guest", () => {
    cy.visit("/");
    cy.get("input#filter_keyword").type("shampoo"); // begépeljük a 'shampoo'-t a keresőmezőbe
    cy.get("input#filter_keyword").type("{enter}"); // enter megnyomásával elindítjuk a keresést
    cy.contains(".prdocutname", "Curls to straight Shampoo").click(); // a találatok között szerepelnie kell: 'Curls to straight Shampoo' és rákattintunk
    cy.url().should("include", "product_id=74"); // ellenőrizzük a kiválasztott termék részletező oldalát
    cy.contains("#myTab a", "Reviews").click(); // rákattintunk a 'Reviews' tabra
    cy.get("#current_reviews .content").should("exist"); // ellenőrizzük, hogy létezik-e korábbi review

    cy.get("input#product_quantity").clear(); // kitöröljük a default '1' értéket
    cy.get("input#product_quantity").type("2"); // Qty mezőbe kettőre növeljük a termék darabszámát
    cy.get("ul.productpagecart a.cart").click(); // behelyezzük a termékeket a kosárba

    cy.url().should("include", "rt=checkout/cart"); // validáljuk, hogy átkerültünk a checkout cart oldalra
    cy.get(".container-fluid.cart-info.product-list .align_left a").should(
      "contain",
      "Curls to straight Shampoo" // validáljuk, hogy a kosár valóban ezt a terméket tartalmazza
    );
    cy.contains("#cart_checkout2", "Checkout").click(); // az oldalon található második checkout gombra kattintunk

    cy.url().should("include", "rt=account/login"); // validáljuk, hogy átkerültünk a login oldalra
    cy.get('input#accountFrm_accountguest[type="radio"]').check("guest"); // kiválasztjuk a Guest Checkout radio button-t
    cy.contains("#accountFrm button", "Continue").click(); // a formon belül található Continue gombra kattintunk

    cy.url().should("include", "rt=checkout/guest_step_1"); // validáljuk, hogy átkerültünk a Guest Checkout - Step 1 oldalra és kitöltjük, majd elküldjük a formot
    cy.get("input#guestFrm_firstname").type("Emma");
    cy.get("input#guestFrm_lastname").type("Johnson");
    cy.get("input#guestFrm_email").type("emma.johnson@example.co.uk");
    cy.get("input#guestFrm_telephone").type("+44 20 8000 1122");
    cy.get("input#guestFrm_address_1").type("18 Oxford Street");
    cy.get("input#guestFrm_city").type("London");
    cy.get("select#guestFrm_zone_id").select("Greater London");
    cy.get("input#guestFrm_postcode").type("W1D 1AN");
    cy.contains("#guestFrm button", "Continue").click();

    cy.url().should("include", "rt=checkout/guest_step_3"); // validáljuk, hogy átkerültünk a Checkout Confirmation oldalra
    cy.contains("#checkout_btn", "Confirm Order").click();

    cy.url().should("include", "rt=checkout/success"); // validáljuk, hogy a megrendelés sikeres volt és átkerültünk a Success oldalra

    cy.contains("#maincontainer .contentpanel a", "invoice page").click(); // rákattintunk az invoice page linkre

    cy.url().should("include", "rt=account/invoice&ot="); // validáljuk, hogy átkerültünk az invoice/Order Details oldalra

    // ellenőrizzük a terméknevet
    cy.contains("td", "Curls to straight Shampoo").should("be.visible");

    // ellenőrizzük a darabszámot
    cy.contains("td", "Curls to straight Shampoo") // sor megkeresése
      .parent("tr") // sor kiválasztása
      .within(() => {
        cy.get("td").eq(3).should("contain", "2"); // 4. oszlop a mennyiség
      });

    // ellenőrizzük az egységárat
    cy.contains("td", "Curls to straight Shampoo")
      .parent("tr")
      .within(() => {
        cy.get("td").eq(4).should("contain", "$4.00"); // 5. oszlop az egységár -> 4 USD
      });

    // ellenőrizzük a total price-t
    cy.contains("td", "Curls to straight Shampoo")
      .parent("tr")
      .within(() => {
        cy.get("td").eq(5).should("contain", "$8.00"); // 2 db x $4.00
      });

    // ellenőrizzük a Sub-Total értékét
    cy.contains("td", "Sub-Total:").siblings("td").should("contain", "$8.00");

    // ellenőrizzük a házhozszállítás értékét
    cy.contains("td", "Flat Shipping Rate:")
      .next("td")
      .should("contain", "$2.00");

    // ellenőrizzük a Total (Sub-Total+Flat Shipping Rate) értékét
    cy.contains("td", /^Total:$/) // a teljes egyezés miatt regexet használunk (Total vs. Sub-Total)
      .next("td")
      .should("contain", "$10.00");
  });
});
