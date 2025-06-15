

describe('Terméklista rendezés teszt (A-Z)', () => {
  it('Skin Care kategória - A-Z sorrend ellenőrzése', () => {
    cy.visit('https://automationteststore.com/');
    cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=36"]').click();

    //"A to Z" rendezést
    cy.get('#sort').select('Name A - Z');

    // első három terméknév kigyűjtése
    cy.get('.fixed_wrapper .prdocutname')
      .then(($names) => {
        const firstThreeNames = $names.toArray().slice(0, 3).map(el => el.innerText.trim());
        const sorted = [...firstThreeNames].sort((a, b) => a.localeCompare(b));
        expect(firstThreeNames).to.deep.equal(sorted);
      });
    
  });
  it('2 különböző termék hozzáadása és ellenőrzése a kosárban', () => {
    cy.visit('https://automationteststore.com/');
    cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=36"]').click();
    cy.get(':nth-child(2) > .thumbnail > .pricetag > .productcart').click()
    cy.get('.cart').click()
    //mindig visszamegy a főoldalra
    cy.visit('https://automationteststore.com/');
    cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=36"]').click();
    cy.get(':nth-child(4) > .thumbnail > .pricetag > .productcart').click()
    cy.get('.cart').click()
    cy.get('.table > tbody > :nth-child(2) > :nth-child(2) > a').should('contain', "Tropiques Minerale Loose Bronzer")
    cy.get('tbody > :nth-child(3) > :nth-child(2) > a').should('contain', "Viva Glam Lipstick")
    //nem tudtam kiszedni az árát, ezért beleírtam kézzel mint a barbárok
    cy.get('.table > tbody > :nth-child(2) > :nth-child(4)').should('contain', "38.50")
    cy.get('tbody > :nth-child(3) > :nth-child(4)').should('contain', "5.00")
    cy.get('input[name^="quantity["]').eq(0).should('have.value', '1');
    cy.get('input[name^="quantity["]').eq(1).should('have.value', '1');
    //const firstProductPrice = 38.50
    //const secondProductPrice = 5
    //let összeg = firstProductPrice + secondProductPrice
    //let subTotal = cy.get(':nth-child(1) > :nth-child(2) > .bold').invoke('attr', 'tittle').then((subTotal))
    //console.log(subTotal)
    //expect(összeg).to.equal(subTotal)
    //fogalmamsincs
    cy.get('#categorymenu .subcategories').should('have.length', 7);
  });  
  it('Regisztrációs űrlap', () => {
    cy.visit('https://automationteststore.com/');
    cy.get('#customer_menu_top > li > a').click();
    cy.get('#accountFrm > fieldset > .btn').click();
    cy.get('#AccountFrm_firstname').type('Polla');
    cy.get('#AccountFrm_lastname').type('Hauck');
    cy.get('#AccountFrm_email').type('pollametta');
    cy.get('#AccountFrm_postcode').type("12")
    cy.get('#AccountFrm_city').type("te")
    cy.get('.col-md-2 > .btn').click()
    cy.get('.help-block').should('be.visible').and('contain', 'Email Address does not appear to be valid!');
    cy.get('.help-block').should('be.visible').and('contain', 'City must be between 3 and 128 characters!');
    cy.get('.help-block').should('be.visible').and('contain', 'Zip/postal code must be between 3 and 10 characters!');
  });
});
