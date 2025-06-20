describe('Products sorting', () => { // Második feladat 

    beforeEach(() => {
        cy.visit('/'); // baseUrl használata, jelenleg indokolatlan, de bővithetőség szempontjából több tesztesetnél szükséges
    });

    it('Checking if the ABC sorter is working', () => {

        cy.get('#categorymenu .nav-pills.categorymenu a') // Van egy keskenyebb (pl mobil) megjelenitésnél használt dropdown ami szintén tartalmazza a keresett szót ezért a megfelelő DOM-ra szükséges szűkiteni a gettelést
            .contains('Skincare')
            .click(); // Skincare kategória kiválasztása

        cy.get('select#sort') // Megkeresi a selectort az oldalon (sort id-val)
            .select('Name A - Z'); // Kiválasztja az A-tól Z-ig opciót

        cy.get('.prdocutname') // Termékcímek kiválasztása, király typo...
            .then(($elements) => { // DOM elemek mentése
                const firstThreeItem = $elements.slice(0, 3); // Csak az első 3ra van szükség

                const itemNames = Array.from(firstThreeItem) // Kezelhető tömbbé alaktás
                    .map((el) => el.innerText.trim()); // Levágjuk a szóközöket a tömb elemein

                const sortedNames = itemNames.sort((a, b) => a.localeCompare(b)); // sorba rendezzük

                expect(itemNames).to.deep.equal(sortedNames); // A rendezett és az eredeti sorrenddes tömb összhasonlitása (tartalmilag is)
            });
    });
});
