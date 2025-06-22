describe("Product Sorting", () => {
  beforeEach(() => {
    // visiting the correct URL
    cy.visit("/index.php?rt=product/category&path=43");
    // asserting that the page has loaded
    cy.url().should("include", "path=43");
  });

  it("A-Z sorting is correctly working", () => {
    //select the "Name A-Z" option from the dropdown
    cy.get("#sort").select("Name A - Z");

    //grab all the products in their displayed order
    cy.get(".fixed .prdocutname").then((items) => {
      //convert nodelist to an array
      const names = [...items].map((el) => el.innerText);
      // create a separate alphabetically sorted copy of the names array
      const sorted = [...names].sort();

      // assert that the first 3 displayed product names match the sorted version
      expect(names.slice(0, 3)).to.deep.equal(sorted.slice(0, 3));
    });
  });
});
