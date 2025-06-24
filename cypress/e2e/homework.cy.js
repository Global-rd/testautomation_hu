/// <reference types="cypress"/>

describe('4. Házi feladat spec', () => {
  it('2. Terméklista rendezés tesztje', () => {
    cy.visit('/index.php?rt=product/category&path=36'); // Makeup
    // Kijelölöm a rendezés opciót,
    cy.get('#sort')
      // és kiválasztom, hogy A-Z sorrendben rendezze.
      // Az opciót az értéke alapján jelölöm ki.
      .select('pd.name-ASC');
    // Az oldal ekkor újra tölt.

    const products = [];
    // Kijelölöm az összes termék nevet.
    // A fejlesztő elgépelte az osztály nevét,
    // és a jobb kezével fáziskésésben volt.
    cy.get('.thumbnails.grid a.prdocutname') // SIC
      // Minden elemnek egy tömbbe gyűjtöm csak a szövegét,
      .each(element => products.push(element.text().trim()))
      .then(() => {
        // majd a tömböt összehasonlítom az ABC sorrenbe rendezett változatával.
        // A feladat csak az első 3 elemre kérdezett, így a két tömböt 3 elemre szorítom meg.
        expect(products.slice(0, 3)).to.have.ordered.members(products.sort().slice(0, 3));
      })
  });

  it('3. Kosár funkciók tesztelése', () => {
    cy.visit('/');
    const prices = [];
    const products = [];

    // Hogy a termék biztosan raktáron legyen, a kezdő oldalon lévő legújabb termékekből választok ki 2 terméket.
    cy.get('#latest').within(() => {
      // Kiválasztom az összes terméket reprezentáló elemeket.
      const thumbnails = cy.get('.thumbnails > div');

      // Kosárba teszem az elsőt, és feljegyzem a nevét és az árát.
      thumbnails.first().within(() => {
        cy.addToCart();
        cy.getPrice().then(price => prices.push(price));
        cy.getProductName().then(product => products.push(product));
      })
      // Ugyanezt teszem a másodikkal.
      .next().within(() => {
        cy.addToCart();
        cy.getPrice().then(price => prices.push(price));
        cy.getProductName().then(product => products.push(product));
      });
    });

    // Betöltjük a kosár tartalmát.
    cy.visit('/index.php?rt=checkout/cart')
    // Sajnos a táblázatnak egyik része sincs rendesen beazonosíthatóan megjelölve,
    // így az elemek sorszám szerinti kiválasztásával kell kijelölnöm a vizsgált elemeket.
    // A termékek nevét, árát és darabszámát, sorrendben akartam vizsgálni,
    // így a konkrét elemet kellett kijelölnöm.

    // Termék neve megegyezik
    cy.get('.cart-info table:first tr td:nth-child(2)').each((element, idx) => {
      expect(element.text().trim()).to.be.equal(products[idx]);
    });
    // Termék ára megegyezik
    cy.get('.cart-info table:first tr td:nth-child(4)').each((element, idx) => {
      expect(Number(element.text().substring(1))).to.be.equal(prices[idx]);
    });
    // Minden termékből csak 1 van a kosárban.
    cy.get('input[id^="cart_quantity"]').each((element, idx) => {
      expect(Number(element.val())).to.be.equal(1);
    });
    // A termékek összege helyesen van kiválasztva.
    cy.get('#totals_table > tbody > :nth-child(1) > :nth-child(2)').then(element => {
      expect(Number(element.text().substring(1)))
        .to.equal(prices.reduce((acc, val) => acc += val));
    });
  });

  it('4. Termék kategóriák', () => {
    cy.visit('/');
    // A (fő) kategóriák listájára nincs külön oldal,
    // ezért a főoldalon, a navigációs listában jelöljük ki.
    // Ezen listában ugyanúgy szerepel a home gomb is, amit nem akarunk beleszámolni.
    cy.get('#categorymenu .nav-pills > li > a:not(a.menu_home)')
      .should('have.length', 7);
  });

  it ('5. Regisztrációs űrlap hibakezelése', () => {
    cy.visit('/index.php?rt=account/create');

    // Az oldal meglátogatásakor a form üres,
    // így azt üresen küldjük el.
    cy.get('#AccountFrm').submit();

    // Megvizsgáljuk, hogy megjelenik-e egy összesítő hiba üzenet,
    cy.get('.alert')
      .should('be.visible')
      // amiben csak a Privacy Policy elfogadására szóló üzenet szerepel.
      .contains('agree to the Privacy Policy')
      .should('exist');

    // Elfogadjuk a Privacy Policy-t, és újra küldjük a formot.
    cy.get('#AccountFrm_agree').check();
    cy.get('#AccountFrm').submit();

    // Megvizsgáljuk, hogy megjelenik-e egy összesítő hiba üzenet,
    cy.get('.alert')
      .should('be.visible')
      // És megnézzük, hogy az összes hibás mező benne szerepel.
      .contains('Login name')
      .contains('First Name')
      .contains('Last Name')
      .contains('Email Address')
      .contains('Address 1')
      .contains('City')
      .contains('Zip/postal code')
      .contains('region / state')
      .contains('Password')
      .should('exist');

    // Először a vezeték nevet töltjük ki rosszul.
    // A kitétel 1–32 karakter közé korlátozza a bevitelt.

    cy.get('#AccountFrm_firstname')
      .type('123456789012345678901234567890123');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .should('be.visible')
      .contains('First Name')
      .should('exist');

    cy.get('#AccountFrm_firstname')
      .clear()
      .type('12345678901234567890123456789012');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .contains('First Name').should('not.exist');

    // Következő: keresztnév
    // 1–32

    cy.get('#AccountFrm_lastname')
      .type('123456789012345678901234567890123');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .should('be.visible')
      .contains('Last Name')
      .should('exist');

    cy.get('#AccountFrm_lastname')
      .clear()
      .type('12345678901234567890123456789012');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .contains('Last Name').should('not.exist');

    // Következő: email
    // Formátuma helyes legyen

    cy.get('#AccountFrm_email')
      .type('user@example.com');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .contains('Email')
      .should('not.exist');

    // Következő: 1. címsor
    // 3–128

    cy.get('#AccountFrm_address_1')
      .type('12');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .should('be.visible')
      .contains('Address 1')
      .should('exist');

    cy.get('#AccountFrm_address_1')
      .type('3456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .should('be.visible')
      .contains('Address 1')
      .should('exist');

    cy.get('#AccountFrm_address_1')
      .clear()
      .type('12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .contains('Address 1').should('not.exist');

    // Következő: város
    // 3–128

    cy.get('#AccountFrm_city')
      .type('12');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .should('be.visible')
      .contains('City')
      .should('exist');

    cy.get('#AccountFrm_city')
      .type('3456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .should('be.visible')
      .contains('City')
      .should('exist');

    cy.get('#AccountFrm_city')
      .clear()
      .type('12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .contains('City').should('not.exist');

    // Következő: Régió
    // Legyen kiválasztva

    cy.get('#AccountFrm_zone_id')
      .select(1);
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .contains('region / state')
      .should('not.exist');

    // Következő: Irányítószám
    // 3–10

    cy.get('#AccountFrm_postcode')
      .type('12');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .should('be.visible')
      .contains('Zip/postal code')
      .should('exist');

    cy.get('#AccountFrm_postcode')
      .type('345678901');
    cy.get('#AccountFrm').submit();

    // A teszt ezen a ponton elbukik,
    // mert bár a hiba jelzésben nem mehet tovább 10-nél, de az oldal elfogadja.
    cy.get('.alert')
      .should('be.visible')
      .contains('Zip/postal code')
      .should('exist');

    cy.get('#AccountFrm_postcode')
      .clear()
      .type('1234567890');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .contains('Zip/postal code')
      .should('not.exist');
  });
});