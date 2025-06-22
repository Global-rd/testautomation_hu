/// <reference types="cypress"/>

describe('4. Házi feladat spec', () => {
  it('2. Terméklista rendezés tesztje', () => {
    cy.visit('/index.php?rt=product/category&path=36'); // Makeup
    cy.get('#sort').select('pd.name-ASC');
    const products = [];
    cy.get('.thumbnails.grid a.prdocutname') // SIC
      .each(element => products.push(element.text().trim()))
      .then(() => {
        expect(products.slice(0, 3)).to.have.ordered.members(products.sort().slice(0, 3));
      })
  });

  it('3. Kosár funkciók tesztelése', () => {
    cy.visit('/');
    const prices = [];
    const products = [];

    cy.get('#latest').within(() => {
      const thumbnails = cy.get('.thumbnails > div');

      thumbnails.first().within(() => {
        cy.addToCart();
        cy.getPrice().then(price => prices.push(price));
        cy.getProductName().then(product => products.push(product));
      })
      .next().within(() => {
        cy.addToCart();
        cy.getPrice().then(price => prices.push(price));
        cy.getProductName().then(product => products.push(product));
      });
    });

    cy.visit('/index.php?rt=checkout/cart')
    cy.get('.cart-info table:first tr td:nth-child(2)').each((element, idx) => {
      expect(element.text().trim()).to.be.equal(products[idx]);
    })
    cy.get('.cart-info table:first tr td:nth-child(4)').each((element, idx) => {
      expect(Number(element.text().substring(1))).to.be.equal(prices[idx]);
    })
    cy.get('input[id^="cart_quantity"]').each((element, idx) => {
      expect(Number(element.val())).to.be.equal(1);
    })
    cy.get('#totals_table > tbody > :nth-child(1) > :nth-child(2)').then(element => {
      expect(Number(element.text().substring(1)))
        .to.equal(prices.reduce((acc, val) => acc += val));
    });
  })
});