/// <reference types="cypress"/>

describe('4. Házi feladat spec', (suite) => {
  it('2. Terméklista rendezés tesztje', () => {
    cy.visit('/index.php?rt=product/category&path=36'); // Makeup
    cy.get('#sort').select('pd.name-ASC');
    const products = [];
    cy.get('.thumbnails.grid a.prdocutname') // SIC
      .each(element => products.push(element.text().trim()))
      .then(() => {
        expect(products.slice(0, 3)).to.have.ordered.members(products.sort().slice(0, 3));
      })
  })
});