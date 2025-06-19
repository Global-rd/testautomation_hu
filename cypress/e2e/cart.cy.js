describe("Kosár működés teszt", () => {
  it("Két termék hozzáadása és ellenőrzés", () => {
    cy.visit("/");
    cy.get(".prdocutname").contains("Skinsheen Bronzer Stick").click();
    cy.get("a.cart").click();
    cy.contains("a", "Continue Shopping").click();

    cy.get(".productname").contains("Total Moisture Facial Cream").click();
    cy.get("a.cart").click();

    cy.get(".productname").should("have.length", 2);

    cy.get('table#cart tbody tr td:nth-child(5)').then(($prices) => {
        const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
        const total = prices.reduce((sum, price) => sum + price, 0);
      
        cy.get('#cart_subtotal span').invoke('text').then(text => {
          const subtotal = parseFloat(text.replace('$', ''));
          expect(subtotal).to.eq(total);
        });
      });
      
  });
});
