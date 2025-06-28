describe("Automation Test Store", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Test for product list sorting", () => {
    cy.get("#customer_menu_top").should("be.visible"); //asszert az oldal betöltésére
    cy.get(
      'a[href="https://automationteststore.com/index.php?rt=product/category&path=43"]'
    ).click(); //link keresése a megfelelő attribútummal és kattintás
    cy.get("#sort").select("pd.name-ASC");
    cy.get("a.prdocutname").first().should("be.visible"); //assert, hogy az első termék látható

    let productTitles = [];
    cy.get("a.prdocutname")
      .each(($element) => {
        // minden termék elemre végrehajtja a következő műveleteket
        const title = $element.attr("title"); // kinyerjük a 'title' attribútum értékét
        if (title) {
          let trimmedTitle = title.trim(); // levágja a felesleges szóközöket
          productTitles.push(trimmedTitle); //feltölti a tömböt az elemekkel
        }
      })
      .then(() => {
        expect(productTitles).to.not.be.empty; //ellenőrizzük, hogy a lista nem üres
        const sortedProductTitles = [...productTitles].sort(); // másolat és rendezés
        sortedProductTitles.forEach((title) => cy.log(title)); //log a terméknevekről
        expect(productTitles).to.deep.equal(sortedProductTitles); //assert, hogy a terméknevek rendezettek
      });
  });
});
