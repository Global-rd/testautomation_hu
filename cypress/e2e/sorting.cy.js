describe('Termékek rendezése', () => {
    beforeEach(() => {
      cy.visit('/index.php?rt=product/category&path=43');
    });
  
    it('A-Z rendezés helyesen működik', () => {
      cy.get('#sort').select('Name A - Z');
  
      cy.get('.fixed .prdocutname').then(items => {
        const names = [...items].map(el => el.innerText);
        const sorted = [...names].sort();
  
        expect(names.slice(0, 3)).to.deep.equal(sorted.slice(0, 3));
      });
    });
  });
  
  