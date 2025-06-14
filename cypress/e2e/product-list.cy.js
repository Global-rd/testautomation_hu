describe('template spec', () => {

    const testedCategory = /books/i;
    const home = /home/i;
    const testedCategoryId = 65;

    beforeEach(() => {
        cy.visit('/');
    })

    it('PL01 - displays all expected nav bar buttons', () => {
        cy.fixture('fixtures').then(fixtures => {
            cy.get('#categorymenu .nav-pills > li').each((liElement, index) => {
                cy.wrap(liElement).find('a').eq(0).invoke('text').then(textContent => {
                    expect(textContent.trim().toLowerCase()).eq(fixtures.navbarButtons[index].toLowerCase());
                })
            })
        })
    });

    it('PL02 - can visit the selected category', () => {
        cy.contains('.nav-pills a', testedCategory).eq(0)
            .should('be.visible') // Assert that the button is visible before clicking
            .click();

        cy.url().should('include', 'rt=product');
        cy.url().should('include', testedCategoryId);
    });

    it('PL03 - has exactly 7 product categories', () => {
        let count = 0;
        cy.fixture('fixtures').then(fixtures => {
            cy.get('#categorymenu .nav-pills > li').each((liElement, index) => {
                cy.wrap(liElement).find('a').eq(0).invoke('text').then(textContent => {
                    if (!home.test(textContent.trim())) {
                        count++;
                    }
                })
            })
        }).then(() => {
            expect(count).eq(7);
        });
    });

    it('PL04 - can order items alphabetically in selected category', () => {
        cy.contains('.nav-pills a', testedCategory).eq(0)
            .should('be.visible') // Assert that the button is visible before clicking
            .click();

        cy.get("#sort").select("pd.name-ASC").then(() => {
            cy.get('.prdocutname').filter(':visible').then(products => {
                const productNames = products.map((index, el) => {
                    return Cypress.$(el).text().trim();
                }).get();

                let previousItemName;

                for (let i = 0; i < productNames.length; i++) {
                    const currentProductName = productNames[i].trim().toLowerCase();

                    if (!!previousItemName) {
                        expect(previousItemName < currentProductName).to.be.true;
                    }
                    previousItemName = currentProductName;
                }
            });
        });
    });
})