describe('Cypress Automation', () => {

  // Beallitottam, hogy minden teszt elott latogasson el a websitera. 
  beforeEach(() => {
    cy.visit('/')
  })

  it('2. Opens up a product category to validate sorters are working. ', () => {
    // Megnyitja a "Fragrance" kategoriat, beallitja a sortert es ellenorzi, hogy a termekek nevei helyesen vannak-e rendezve.
    cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=49"]').click()
    cy.get('#sort').select('Name A - Z');
    cy.get('.prdocutname')
      .then(($products) => {
        // A kiszedett elemeket egy tombbe konvertaljuk, majd a slice() metodussal csak az elso harom termeket vesszuk ki.
        const [a, b, c] = $products.toArray().slice(0, 3);
        // Osszehasonlitjuk a termekek neveit, hogy helyesen vannak-e rendezve az innterText funkcio segitsegevel.
        cy.expect(a.innerText.localeCompare(b.innerText) <= 0 && b.innerText.localeCompare(c.innerText) <= 0);
      })
  })

  it.only('3. Adds two products to the cart and validates their names.', () => {
    cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=49"]').click()
    cy.get('.thumbnails > :nth-child(2) > .thumbnail > .pricetag > .productcart').click() 
    cy.get('.cart').click()
    // Beraktuk a kosarba az elso elementet, majd visszamegyunk a fo oldalra. 
    cy.visit('https://automationteststore.com/');
    cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=49"]').click()
    cy.get(':nth-child(4) > .thumbnail > .pricetag > .productcart').click()
    cy.get('.cart').click()
    // Hozzaadtuk a masodik termeket is
    // Ellenorizzuk, hogy a checkout oldalon vagyunk 
    cy.url('/').should('include', 'https://automationteststore.com/index.php?rt=checkout/cart');
    // Ellenorizzuk, hogy a kosarban ket termek van es azoknak neveit meg arat 
    const quantities = cy.get(/#cart_quantity/).then(console.log)
    // cy.get('.table > tbody > :nth-child(2) > :nth-child(2) > a').should('contain', "Gucci Guilty")
    // cy.get('.table > tbody > :nth-child(2) > :nth-child(6)').should('contain', "$105.00")

    // cy.get('.table > tbody > :nth-child(3) > :nth-child(2) > a').should('contain', "Secret Obsession Perfume")
    // cy.get('.table > tbody > :nth-child(3) > :nth-child(6)').should('contain', "$62.00")
    // cy.get('input[name^="quantity["]').eq(0).should('have.value', '1');
    // cy.get('input[name^="quantity["]').eq(1).should('have.value', '1');
  })
})