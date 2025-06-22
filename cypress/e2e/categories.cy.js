describe("Product Categories", () => {
  beforeEach(() => {
    //can be removed as it doesn't really do anything in our current test
    cy.visit("/");
  });
  it("There are exactly 7 product categories", () => {
    //we search for all the categorymenu items and remove the one that has a a.menu_home id
    cy.get("ul.categorymenu > li")
      .not(":has(a.menu_home)")
      .should("have.length", 7);
  });
});
