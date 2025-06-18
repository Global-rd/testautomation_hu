describe('Automatedstore test', () => {
  beforeEach(() => {
   cy.visit('/') })


it('2.Feladat: Terméklista rendezés tesztje', () => {
 // Nyisd meg a "Skin Care" kategóriát
  cy.get('a[href="https://automationteststore.com/index.php?rt=product/category&path=43"]').click({ force: true });

  // Eseményfigyelő hozzáadása az oldal változásainak figyelésére (ezáltal flaky oldal betöltést kiküszöbölve)
  cy.document().then(doc => {
const observer = new MutationObserver(() => {
 if (doc.querySelector('.thumbnails .prdocutname')) {
observer.disconnect();

 // Eredeti terméklista mentése szűrés nélkül (Old-New alap beállítással)
cy.get('.thumbnails .prdocutname').then($products => {
 const originalProductNames = $products.map((index, html) => Cypress.$(html).text().trim()).get();

// Az eredeti terméklistából eltávolítjuk az extra szóközöket és azonosítókat a terméknevekből
const cleanedOriginalProductNames = originalProductNames.map(name => name.replace(/\s+/g, ' ').replace(/\s*\(\w+\)\s*/g, '').trim());

 // Az eredeti terméklistát elmentjük
 const firstThreeOriginalProductNames = cleanedOriginalProductNames.slice(0, 3);

 // Kilogoljuk az első három eredeti terméknevet.
cy.log('First Three Original Product Names:', JSON.stringify(firstThreeOriginalProductNames));

// Majd másolatot készítünk az első három terméknevekről és ABC sorrendbe rendezzük 
const sortedFirstThreeProductNames = [...firstThreeOriginalProductNames].sort((a, b) => a.localeCompare(b));

// Kilogoljuk a rendezett első három terméknevet
 cy.log('Sorted First Three Product Names:', JSON.stringify(sortedFirstThreeProductNames));

 // Eseményfigyelő hozzáadása az oldal változásainak figyelésére ( A flaky oldal betöltés ellen,
 //  mert különben hamarabb kezdi el a sort-ot keresni, mint hogy rákattintana skincare-re)
cy.document().then(doc => {
 const observer = new MutationObserver(() => {
if (doc.querySelector('#sort')) {
 observer.disconnect();
cy.get('#sort').select('pd.name-ASC');
}
 });

 observer.observe(doc, { childList: true, subtree: true });
});

 // Lementjük sortolás után az első 3 terméknevet
 cy.get('.thumbnails .prdocutname').then($sortedProducts => {
 const filteredProductNames = $sortedProducts.map((index, html) => Cypress.$(html).text().trim()).get();

 // Eltávolítjuk az extra szóközöket és azonosítókat a terméknevekből
 const cleanedFilteredProductNames = filteredProductNames.map(name => name.replace(/\s+/g, ' ').replace(/\s*\(\w+\)\s*/g, '').trim());

 // Elmentjük 
 const firstThreeFilteredProductNames = cleanedFilteredProductNames.slice(0, 3);

 // Kilogoljuk az első három Abc sorrendbe rendezett terméknevet
 cy.log('First Three Filtered Product Names:', JSON.stringify(firstThreeFilteredProductNames));

 // Ellenőrizzük, hogy az első három eredeti rendezett terméknév megegyezik-e az első három terméknévvel
 expect(firstThreeFilteredProductNames).to.deep.equal(sortedFirstThreeProductNames);
});
});
 }
});
 observer.observe(doc, { childList: true, subtree: true });
 });
});


it('3.Feladat: Kosár funkciók tesztelése', () => {
cy.get('a[href="https://automationteststore.com/index.php?rt=product/category&path=43"]').click({ force: true });

 // Eseményfigyelő hozzáadása ( A flaky oldal betöltés ellen,
 //  mert különben hamarabb kezdi el a terméket keresni, mint hogy rákattintana skincare-re)
cy.document().then(doc => {
 const observer = new MutationObserver(() => {
 if (doc.querySelector('.thumbnails .prdocutname')) {
 observer.disconnect();

 let productName1, productName2; // változóban elmentem a termékek neveit

 cy.get(':nth-child(1) > .fixed_wrapper > .fixed > .prdocutname').then($productName1 => {
   productName1 = $productName1.text(); 
   });

 cy.get(':nth-child(2) > .fixed_wrapper > .fixed > .prdocutname').then($productName2 => {
   productName2 = $productName2.text();

  });
// Beteszem kosárba a termékekeket, majd rákattintok a felső kosár ikonra, ami a kosár oldalra visz
 cy.get(':nth-child(1) > .thumbnail > .pricetag > .productcart').click();
 cy.get(':nth-child(2) > .thumbnail > .pricetag > .productcart > .fa').click();
 cy.get('.block_7 > .nav > .dropdown > .dropdown-toggle').click();

 // Terméknevek ellenőrzése a kosárban
 cy.get('.table > tbody > :nth-child(2) > :nth-child(2) > a').should('be.visible').then($cartProductName1 => {
 const cartProductName1 = $cartProductName1.text();
expect(cartProductName1).to.equal(productName1);
 });

 // Terméknevek ellenőrzése a kosárban
cy.get('.table > tbody > :nth-child(3) > :nth-child(2) > a').should('be.visible').then($cartProductName2 => {
const cartProductName2 = $cartProductName2.text();
 expect(cartProductName2).to.equal(productName2);
 });

// Ellenőrizzük, hogy a kosárban 2 darab termék van-e
 cy.get('.dropdown-toggle > .label').should('have.text', '2');

 //A termékek árát lekérdezzük, "kiterjesztés" nélkül, majd összeadjuk őket, és elmentjük a Total price változóba (Itt is lehetne azzal variálni hogy a totál price változót kérjük le, de már nincs hozzá erőm)
cy.get('.table > tbody > :nth-child(2) > :nth-child(4)').then($product1 => {
const product1Price = parseFloat($product1.text().replace('$', ''));
 cy.get('tbody > :nth-child(3) > :nth-child(4)').then($product2 => {
   const product2Price = parseFloat($product2.text().replace('$', ''));
 const totalPrice = product1Price + product2Price;
cy.log('Total Price: ' + totalPrice);

// Lekérjük a Sub-Total értékét a táblázatból
cy.get('#totals_table .extra.bold').contains('Sub-Total:').parent().next().find('.bold').then($subtotal => {
 const subtotalPrice = parseFloat($subtotal.text().replace('$', ''));
  cy.log('Sub-Total Price: ' + subtotalPrice);

// Ellenőrizzük, hogy a Sub-Total értéke megegyezik az összeadott árral
 expect(subtotalPrice).to.equal(totalPrice);
 });
});
 });
}
});

observer.observe(doc, { childList: true, subtree: true });
});
});


it('4.Feladat: Termék kategóriák ellenőrzése', () => {
  cy.get('.categorymenu').children().filter(':not(:first)').should('have.length', 7); //lekérjük a kategória menüt, de az elsőt kihagyjuk
  //  mert az egy home gomb, majd ellenőrizzük a darabszámotíí
});


it('5.Feladat: Regisztrációs űrlap hibás adatokkal', () => {
  // Nyisd meg a regisztrációs oldalt
  cy.visit('https://automationteststore.com/index.php?rt=account/create'); // itt már rögtön a regisztrációs oldalt nyitottam meg, persze lehetett volna 2-3 lépésben átnavigálni.

  // Érvénytelen email cím és Privacy Policy ellenőrzése
  cy.get('#AccountFrm_firstname').type('John');
  cy.get('#AccountFrm_lastname').type('Doe');
  cy.get('#AccountFrm_email').type('invalid-email');
  cy.get('#AccountFrm_address_1').type('123 Main St');
  cy.get('#AccountFrm_city').type('Anytown');
  cy.get('#AccountFrm_country_id').select('United States');
  cy.get('#AccountFrm_zone_id').select('California');
  cy.get('#AccountFrm_postcode').type('12345');
  cy.get('#AccountFrm_password').type('password123');
  cy.get('#AccountFrm_confirm').type('password123');
  
  cy.get('.col-md-2 > .btn').click(); //Privacy Policy csekkolása nélkül, kattintunk
  cy.get('.alert').should('contain', 'Error: You must agree to the Privacy Policy!'); //megjelenik a hibaüzenet 1
  cy.get('#AccountFrm_agree').check();//Privacy Policy-t becsekkolása majd, kattintunk
 cy.get('.col-md-2 > .btn').click();
cy.get('.alert').should('contain','Email Address does not appear to be valid!'); //Ellenőrizzük, hogy az invalid emailcím miatt hibát dob-e



  // Rövid jelszó ellenőrzése
  cy.get('#AccountFrm_loginname').type('john.doe881');
  cy.get('#AccountFrm_password').type('sho');
  cy.get('#AccountFrm_confirm').type('sho');
  cy.get('.col-md-2 > .btn').click();
  cy.get('.alert').should('contain', 'Password must be between 4 and 20 characters!');
});


});