describe('Checking basic UI elements', () => {

    beforeEach(() => {
        cy.visit('/'); // baseUrl használata, jelenleg indokolatlan, de bővithetőség szempontjából több tesztesetnél szükséges
    });

    it.only('Checking if the main page has exactly 7 category', () => { // Negyedik feladat

        cy.get('ul.categorymenu > li') // Kategóriamenü összes elemének a kiválasztása
            .not(':has(a.menu_home)') // Kizárjuk azt, amelyik tartalmazza a menu_home osztályt
            .should('have.length', 7); // Ellenőrzés hogy 7 elem maradt-e
            
    });
});
