describe('Cart functions', () => { // Harmadik feladat

    beforeEach('Add two product into the cart and navigate to the cart page', () => {
        cy.visit('/'); // baseUrl használata
        cy.contains('Skinsheen Bronzer Stick') // Szöveg alapján történő item választás
            .parents('.fixed_wrapper') // Az elem fölötti elem kiválasztása konkrét osztályra keresve
            .parent() // Az elem fölötti közvetlen osztály kiválasztása
            .find('.productcart') // Az elem alatti osztályra keresés
            .click(); // Kosárba rakás

        cy.contains('Flash Bronzer Body Gel') // Szöveg alapján történő item választás
            .parents('.fixed_wrapper') // Az elem fölötti elem kiválasztása konkrét osztályra keresve
            .parent() // Az elem fölötti közvetlen osztály kiválasztása
            .find('.productcart') // Az elem alatti osztályra keresés
            .click(); // Kosárba rakás

        cy.get('i.fa-shopping-cart').parent('.dropdown-toggle').click(); // Kosár megtekintése

        // dev note, improvement idea: Ha minimum darabszámos a termék akkor a főoldalról jelzés nélkül rak többet a kosárba
        // dev note, improvement idea: Ha pl szint lehet választani egy terméknék akkor a főoldalról a termék adatlapra navigál az alkalmazás a kosrábahelyezés előtt
    });

    it('Checking if the details are correct on the cart page', () => {
        // Darabszám ellenőrzése a fejlécben
        cy.get('a.dropdown-toggle:has(i.fa-shopping-cart)') // Több span miatt fontos hogy a kosara ikon melletti
            .find('span.label') // span értékét vegyük
            .should('have.text', '2'); // Kosárban található elemek számának ellenőrzése

        // Ár, név, darabszám ellenőrzése a táblázatban
        cy.get('table.table-striped tbody tr').eq(1).within(() => { // Kiválasztjuk a fejlécen kivüli első sort
            cy.contains('Skinsheen Bronzer Stick'); // Ellenörzünk a termék nevére
            cy.get('td').eq(3).should('contain', '29.50'); // Ellenörzünk a termék árára
            cy.get('input[name^="quantity"]').should('have.value', '1'); // Ellenörzünk a termék darabszámára
        });

        cy.get('table.table-striped tbody tr').eq(2).within(() => { // Kiválasztjuk a fejlécen kivüli második sort
            cy.contains('Flash Bronzer Body Gel'); // Ellenörzünk a termék nevére
            cy.get('td').eq(3).should('contain', '29.00'); // Ellenörzünk a termék árára
            cy.get('input[name^="quantity"]').should('have.value', '1'); // Ellenörzünk a termék darabszámára
        });
    });

    it('Checking if the sub-total counter is working correctly', () => {
        const expectedTotal = 29.50 + 29.00; // A kosárba tett teszt termékek ára

        cy.get('#totals_table') // Kiválasztjuk az összegző tábla
            .contains('td', 'Sub-Total:') // "Sub-Total" szavát tartalmazó cella
            .next() // Mellett lévő cellát
            .invoke('text') // Aminek vesszük a text értékét
            .then((subTotal) => {
                const subtotalNum = parseFloat(subTotal.replace('$', '')); // Levágjuk a pénznemet majd átalaktjuk float-tá
                expect(subtotalNum).to.equal(expectedTotal); // Összevetjük az oldalon szereplő és az elvárt termékek összegét
            });

    });
});
