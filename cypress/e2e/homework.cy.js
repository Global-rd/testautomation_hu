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



  it('3. Adds two products to the cart and validates their names.', () => {
    cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=49"]').click()
    cy.get('.thumbnails > :nth-child(2) > .thumbnail > .pricetag > .productcart').click() 
    cy.get('.cart').click()
    // Beraktuk a kosarba az elso elementet, majd visszamegyunk a fo oldalra. 

    cy.visit('https://automationteststore.com/');
    cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=49"]').click()
    cy.get(':nth-child(4) > .thumbnail > .pricetag > .productcart').click()
    cy.get('.cart').click()
    // Hozzaadtuk a masodik termeket is

    cy.url('/').should('include', 'https://automationteststore.com/index.php?rt=checkout/cart');
    // Ellenorizzuk, hogy a checkout oldalon vagyunk 

    cy.get('.table > tbody > :nth-child(2) > :nth-child(2) > a').should('contain', "Gucci Guilty")
    const priceOne = cy.get('.table > tbody > :nth-child(2) > :nth-child(6)').should('contain', "$105.00")
    cy.get('.table > tbody > :nth-child(3) > :nth-child(2) > a').should('contain', "Secret Obsession Perfume")
    const priceTwo = cy.get('.table > tbody > :nth-child(3) > :nth-child(6)').should('contain', "$62.00")
    cy.get('input[name^="quantity["]').eq(0).should('have.value', '1');
    cy.get('input[name^="quantity["]').eq(1).should('have.value', '1');
    // Ellenorizzuk, hogy a kosarban ket termek van es azoknak neveit meg arat 
    
    cy.get('#totals_table > tbody > tr:nth-child(2) > td:nth-child(2) > span').should('contain.text', "$169.00")
    // Ellenorizzuk, hogy a teljes osszeg helyesen van kiszamitva
  })

  it('4. Termek kategoriak szamanak ellenorzese.', () => {
    // Egy for ciklust hasznalva a nav menun hosszan iteralunk, es megszamoljuk a termek kategoriakat.
    let productCategorySum = ''
    cy.get('.nav-pills.categorymenu > li').then(($categories) => {
      for (let i = 1 ; i <= $categories.length; i++) {
        cy.wrap($categories[i]);
        productCategorySum++;
      }

      // A termek kategoriak szamanak kiirasa a konzolra, -1 mert a ciklus 0-tol indul, de a kategoriak szama 1-tol kezdodik.
      cy.log(`A termek kategoriak szama: ${productCategorySum - 1}`);
      // Ellenorizzuk, hogy nagyobb mint 0 
      expect(productCategorySum).to.be.greaterThan(0);
    })
  })

  it.only('5. Regisztracios urlap kitoltese hibas adatokkal.', () => {
    // Az elso tesztben uresen kuldtem be a formot, es ellenoriztem, hogy a hiba uzenet megjelenik.
    cy.visit('https://automationteststore.com/index.php?rt=account/create')
    cy.get('button[title="Continue"]').click()
    cy.get('.alert.alert-danger').should('contain', 'Error: You must agree to the Privacy Policy!')

    // A masodikban egy helytelen email cimmel probalkoztam. 
    cy.visit('https://automationteststore.com/index.php?rt=account/create')
    cy.get('#AccountFrm_firstname').type('John')
    cy.get('#AccountFrm_lastname').type('Doe')
    cy.get('#AccountFrm_email').type('invalidemail.com')
    cy.get('#AccountFrm_telephone').type('1234567890')
    cy.get('#AccountFrm_address_1').type('123 Main St')
    cy.get('#AccountFrm_city').type('Anytown')
    cy.get('#AccountFrm_zone_id').select("Angus")
    cy.get('#AccountFrm_postcode').type('12345')
    cy.get('#AccountFrm_country_id').select('Ukraine')
    cy.get('#AccountFrm_password').type('password123')
    cy.get('#AccountFrm_confirm').type('password123')
    cy.get('input[type="checkbox"]').check()
    cy.get('button[title="Continue"]').click()
    cy.get('.alert-danger, .help-block').should('contain.text', 'Email');

    // A harmadikban ket kulonbo jelszot fogok megadni
    cy.visit('https://automationteststore.com/index.php?rt=account/create')
    cy.get('#AccountFrm_firstname').type('John')
    cy.get('#AccountFrm_lastname').type('Doe')
    cy.get('#AccountFrm_email').type('valid@email.com')
    cy.get('#AccountFrm_telephone').type('1234567890')
    cy.get('#AccountFrm_address_1').type('123 Main St')
    cy.get('#AccountFrm_city').type('Anytown')
    cy.get('#AccountFrm_zone_id').select("Angus")
    cy.get('#AccountFrm_postcode').type('12345')
    cy.get('#AccountFrm_country_id').select('Ukraine')
    cy.get('#AccountFrm_password').type('password123')
    cy.get('#AccountFrm_confirm').type('password12345')
    cy.get('input[type="checkbox"]').check()
    cy.get('button[title="Continue"]').click()
    cy.get('.alert-danger, .help-block').should('contain.text', 'password');
  })
})