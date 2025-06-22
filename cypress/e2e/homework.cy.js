describe('Homework', () => {

  beforeEach(() => {

    // BaseUrl megnyitása minden tesztesetnél
    cy.visit('/')

  })
  it('2. feladat - Category order', () => {

    // SKINCARE termékkategória megnyitása
    cy.get('#categorymenu').contains('Skincare').click();

    // Rendezés dropdownból a Name A - Z opció kiválasztása
    cy.get('#sort').select('Name A - Z');

    // Üres tömb létrehozása a nevek gyűjtésére
    const productNames = [];

    // Minden elemhez hozzáférünk és hozzáadjuk a tömbhöz a termék nevét
    cy.get('.fixed_wrapper .prdocutname').each(($el) => {
      const name = $el.text().trim();
      productNames.push(name);
    })
      .then(() => {
      // Létrehozunk egy sorbarendezett tömböt a productNames tömb alapján sortedNames néven.
      const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));

        // Összehasonlítjuk a két tömb sorrendjét, aminek egyeznie kell.
        expect(productNames).to.deep.equal(sortedNames);
    });
  });

  it('3. feladat - Add 2 products to cart, check subtotal price', () => {

    // Üres prices tömb deklarálása az árak eltárolásához
    const prices = [];

    // Konstans létrehozása a hozzáadandó termékek számával
    const itemsToAdd = 2;

    // 2 termék kosárba tétele
    cy.get('.productcart:visible').each(($btn, index) => {
      if (index < itemsToAdd) {
        cy.wrap($btn).click();
      }
    });

    // Kosároldal megnyitása
    cy.get('a.dropdown-toggle[href*="rt=checkout/cart"]').should('be.visible').click();

    // kosár oldal megnyitásának ellenőrzése
    cy.url().should('include', 'rt=checkout/cart');

    // Ellenőrizzük, hogy 2 termék került-e a kosárba.
   cy.get('table.table-bordered tbody tr')
  .filter((index, el) => Cypress.$(el).find('input[type="text"]').length > 0)
  .as('productRows')
  .should('have.length', 2);

    // Kiveszi a táblázatból a tételeket tartalmazó sorokat (az első sor fejléc)
    cy.get('@productRows').each($row => {
      // Ár kiolvasása (4. oszlopból)
      cy.wrap($row).find('td').eq(3).invoke('text').then(priceText => {
        const price = parseFloat(priceText.replace('$', '').trim());

        // Mennyiség kiolvasása (5. oszlopból)
        cy.wrap($row).find('input[type="text"]').invoke('val').then(qtyText => {
          const quantity = parseInt(qtyText.trim());
          prices.push(price * quantity);
         });
       });
    });

    // Kiszámolt összesen összehasonlítása az oldalon kapott összesen értékkel

    // Összesen kiszámolása egységár és mennyiség értékekkel
    cy.then(() => {
      const expectedTotal = prices.reduce((sum, value) => sum + value, 0).toFixed(2);

    // Összesen kiolvasása az oldalról, formázás
      cy.get('.cart_total').invoke('text').then(subText => {
        const actualSubtotal = parseFloat(subText.replace('$', '').trim()).toFixed(2);

        // A Két érték összehasonlítása
        expect(actualSubtotal).to.eq(expectedTotal);
      });
    });
  });

  it('4. feladat - Count category numbers = 7', () => {
    
    cy.get('ul.nav-pills.categorymenu > li')
      .not(':first') // kivesszük a 'Home'-ot
      .should('have.length', 7); // elvárjuk, hogy 7 fő kategória van
  
  });

  it('5. feladat - Registration page errors', () => {
    //Regisztrációs oldal megnyitása
    cy.visit('https://automationteststore.com/index.php?rt=account/create');

    // Űrlap beküldése üresen.
    cy.get('button[title="Continue"]').click();

    // Hibaüzenetek ellenőrzése

    // 1. First Name
    cy.get('input[name="firstname"]')
      .parents('div.has-error')
      .find('.help-block')
      .should('contain.text', 'First Name must be between 1 and 32 characters!');

    // 2. Last Name
    cy.get('input[name="lastname"]')
      .parents('div.has-error')
      .find('.help-block')
      .should('contain.text', 'Last Name must be between 1 and 32 characters!');

    // 3. Email
    cy.get('input[name="email"]')
      .parents('div.has-error')
      .find('.help-block')
      .should('contain.text', 'Email Address does not appear to be valid!');

    // 4. Address 1
    cy.get('input[name="address_1"]')
      .parents('div.has-error')
      .find('.help-block')
      .should('contain.text', 'Address 1 must be between 3 and 128 characters!');

    // 5. City
    cy.get('input[name="city"]')
      .parents('div.has-error')
      .find('.help-block')
      .should('contain.text', 'City must be between 3 and 128 characters!');

    // 6. Zip / Postal Code
    cy.get('input[name="postcode"]')
      .parents('div.has-error')
      .find('.help-block')
      .should('contain.text', 'Zip/postal code must be between 3 and 10 characters!');

    // 7. Region / State
    cy.get('select[name="zone_id"]')
      .parents('div.has-error')
      .find('.help-block')
      .should('contain.text', 'Please select a region / state!');

    // 8. Login Name
    cy.get('input[name="loginname"]')
      .parents('div.has-error')
      .find('.help-block')
      .should('contain.text', 'Login name must be alphanumeric only and between 5 and 64 characters!');

    // 9. Password
    cy.get('input[name="password"]')
      .parents('div.has-error')
      .find('.help-block')
      .should('contain.text', 'Password must be between 4 and 20 characters!');
    });
  });