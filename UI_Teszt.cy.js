// UI Tesztelés - Automation Teststore
describe('Automation Teststore', () => {

    const skinCare = 'a[href*="path=43"]';
    const Eyes = 'a[href*="path=43_47"]';

   beforeEach(() => {
      cy.visit('https://automationteststore.com');
    });

    // “A-Z” rendezés ellenőrzése a Skin Care kategóriában. 
    //Továbbá az első három termék ABC sorrendbeli lekérése és ellenőrzése.
        it('Sort A-Z',() =>{

        //A Skin Care menüelemre való navigálás
        cy.get(skinCare).should('be.visible');
        cy.get(skinCare).eq(0).click();
        //A Skin Care dropdown menüjének megjelenítése
        cy.get(skinCare).next('div.subcategories').invoke('css', 'display', 'block').should('be.visible');               // beállítjuk, hogy látható legyen
        cy.get('#sort').should('be.visible');
        //A Skin Care kategória alatti termékek rendezése A-Z szerint és ellenőrzése, hogy a rendezés sikeres volt-e
        cy.get('#sort').select('Name A - Z').should('have.value', 'pd.name-ASC');
        //Az elsö három termék nevének lekérése és ellenőrzése, hogy az A-Z sorrendben van-e
        cy.get('.fixed_wrapper .prdocutname').invoke('toArray')
        .then(items => {
            const names = Cypress._.take(items.toArray(), 3).map(el => el.innerText.trim());
            const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
            expect(names).to.deep.equal(sortedNames);
        });

    });

    //Kosár tesztelése: két termék hozzádása  a Skin Care kategóriában
    //a nevek, az árak és a Sub-Total ellenőrzése.
    it('Kosar tesztelese', () => {

        cy.get(skinCare).should('be.visible');
        cy.get(skinCare).eq(0).click();
        //A Skin Care kategória alatti termékek megjelenítése (dropdown menü)
        cy.get(skinCare).next('div.subcategories').invoke('css', 'display', 'block').should('be.visible');
        cy.get(skinCare).next('.subcategories').contains('Eyes').click();
        cy.get(Eyes).should('be.visible');

         //Absolue Eye Precious Cells hozzáadása a kosárhoz
         cy.get('.col-md-3').contains('.prdocutname', 'Absolue Eye Precious Cells')
         .parents('.col-md-3')
         .find('.productcart')
         .click();

        //Eye Rejuvenating Serum hozzáadása a kosárhoz
        cy.get('.col-md-3').contains('.prdocutname', 'Eye Rejuvenating Serum')
         .parents('.col-md-3')
         .find('.productcart')
         .click();


        cy.visit('https://automationteststore.com/index.php?rt=checkout/cart');
        //Ellenőrizzük, hogy a kosár tartalmazza-e az Eye Master terméket
        cy.get('.container-fixed').should('be.visible').and('contain.text', 'Absolue Eye Precious Cells');
        //Ellenőrizzük, hogy a kosár tartalmazza-e az Eye Rejuvenating Serum terméket
        cy.get('.container-fixed').should('be.visible').and('contain.text', 'Eye Rejuvenating Serum');


        // Ellenőrizzük, hogy a kosár tartalmazza-e az Absolue Eye Precious Cells termék árát
        cy.contains('td.align_left', 'Absolue Eye Precious Cells')
        .parents('tr')
        .find('td.align_right')
        .first() // csak az első align_right oszlop - UnitPrice lesz megvizsgálva
        .should('contain.text', '$89.00');

        // Ellenőrizzük, hogy a kosár tartalmazza-e az Eye Rejuvenating Serum termék árát
        cy.contains('td.align_left', 'Eye Rejuvenating Serum')
        .parents('tr')
        .find('td.align_right')
        .first() // csak az első align_right oszlop - UnitPrice lesz megvizsgálva
        .should('contain.text', '$126.00');

        // Ellenőrizzük a kosárban szereplő Sub-Total értékét
        cy.contains('span.extra.bold ','Sub-Total:')
        .parents('tr')
        .find('span.bold')
        .should('be.visible')
        .and('contain.text', '$215.00');


    });
    //A menüben szereplö termék kategóriák számának ellenőrzése 
    it('Termek Kategoria', () => {
        let sumProductKategory = 0;

        cy.get('.nav-pills.categorymenu > li').then(($items) => {
            for(let i = 1; i < $items.length; i++) {
                cy.wrap($items[i]).should('be.visible');
                sumProductKategory++;
            }

            cy.log('A termék kategóriák száma: ' + sumProductKategory);
            expect(sumProductKategory).to.be.greaterThan(0);
        });
        
    });

    it('Regisztracio', () => {

        //A regisztrációs oldalra navigálás
        cy.visit('https://automationteststore.com/index.php?rt=account/create');

        //A "Create Account" oldal megjelenésének ellenőrzése
        cy.get('#AccountFrm_firstname').type('Anna');
        cy.get('#AccountFrm_lastname').type('Kovacs');
        cy.get('#AccountFrm_email').type('annak@gmailcom');
        //A "Email" mező kitöltése érvénytelen email címmel
        cy.get('#AccountFrm_address_1').type(' ');

        //Egy ország kiválasztása a "Country" mezőben 
        cy.get('#AccountFrm_country_id')
        .select('Hungary')
        .should('have.value', '97');

        //Egy Régio kiválasztása a "Region / State" mezőben 
        cy.get('#AccountFrm_zone_id')
        .select('Budapest')
        .should('have.value', '1433');

        //A "ZIP Code" mező kitöltése  
        cy.get('#AccountFrm_postcode').type('1234');

        //A City mező kitöltése  
        cy.get('#AccountFrm_city').type('Budapest');
        
        //A felhasználónév és jelszó mezők kitöltése
        cy.get('#AccountFrm_loginname').type('AnnaKovacs');
        cy.get('#AccountFrm_password').type('Anna1234!');
        cy.get('#AccountFrm_confirm').type('Anna1235!');

        //A "Subscribe to Newsletter" jelölőnégyzet bejelölése
        cy.get('#AccountFrm_newsletter1').should('be.visible').check();
        //A "Privacy Policy" jelölőnégyzet bejelölése
        cy.get('#AccountFrm_agree').should('be.visible').check();

         //Ürlap elküldése a Continue gombra kattintva
         cy.get('button[title="Continue"]').click();
        
        //Validációs hibák ellenőrzése
        cy.get('.alert-danger, .help-block')
        .should('contain.text', 'valid');


    });

});
            
       
    
        
    
        


    

