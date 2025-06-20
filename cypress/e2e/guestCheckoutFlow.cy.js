describe('Shopping as a guest - e2e', () => { // Hatodik feladat

    function checkValidationError(inputSelector, expectedMessage) { // Korábbi feladatból hasznosithatjuk
    // dev note: ha kellene még használni több fájlban akkor ki lehetne vezetni külön fájlba.
        cy.get(inputSelector) // Az input mező
            .parents('.form-group') //feletti divek a form-group szintig
            .find('.help-block') // amin belül a "help-block" osztály
            .should('be.visible') // látszódjon
            .and('contain', expectedMessage); // És tartalmazza a konkrét hibaüzenetet
    }

    it('End to end shopping test', () => {

        cy.log('Searching for shampoo');
        cy.visit('/'); // baseUrl használata

        cy.get('#filter_keyword').type('shampoo{enter}'); // Keresés a shampoo szóra
        cy.get('.list-inline').should('contain', 'Shampoo'); // Visszaellenőrzés hogy a találati listában lévő itemek között van-e shampoo


        cy.log('Checking if an already exist rating showed correctly');
        cy.contains('Curls to straight Shampoo') // Szöveg alapján történő item választás
            .parents('.fixed_wrapper').click(); // Cimet tartalmazó div

        cy.get('h1.productname').should('contain.text', 'Curls to straight Shampoo'); // Ellenőrizzük hogy látszódik-e az oldalon a termék neve
        cy.get('.productfilneprice').should('contain.text', '$4.00'); // Ellenőrizzük hogy látszódik-e hogy látszódik-e az oldalon a termék ára

        cy.get('ul#myTab a[href="#review"]').click(); // Átváltunk a review tabra
        cy.get('#review').should('be.visible'); // Ellenőrizzük hogy látható-e review

        cy.get('#current_reviews .content') // Egy korábbi értékelés meglétének ellenőrzése (tesztadat ismert)
            .should('contain.text', 'Stefania V') // Tartalmazza-e az értékelő nevét
            .and('contain.text', 'Great value') // Tartalmaz-e egy konkrét szövegrészletet az értékelés
            .and('contain.text', '01/16/2020'); // Tartalmazza-e a vélemény létrehozásának idejét

        cy.get('#current_reviews img[alt*="Stars"]') // Csillagok kiválasztása
            .should('be.visible') // Ellenőrizzük hogy látszódik-e
            .and('have.attr', 'src') // Van-e attribútuma
            .and('include', 'stars_4.png'); // 4 csillagos-e a teszt értékelés


        cy.log('Checking if the write review form is appeared correctly');
        cy.get('#review input#name').should('exist'); // Ellenőrizzük hogy látszódik-e az értékeléshez megadott név beviteli mezője
        cy.get('#review textarea#text').should('exist'); // Ellenőrizzük hogy látszódik-e az értékelés beviteli mezője
        cy.get('#review input#captcha').should('exist'); // Ellenőrizzük hogy látszódik-e a recaptcha
        cy.get('#review button#review_submit').should('contain.text', 'Submit'); // Ellenőrizzük hogy látszódik-e az értékelés leadás gomb


        cy.log('Add the product to the cart');
        cy.get('#product .cart').click(); // Kosárba helyezzük a terméket
        cy.url().should('include', '/index.php?rt=checkout/cart'); // Ellenőrizzük hogy a kosár nézetre kerültünk-e

        cy.log('Navigate to checkout');
        cy.get('#cart_checkout1').click(); // Tovább a kasszához
        cy.get('#accountFrm_accountguest').check(); // Vendég vásárlás radiobutton kiválasztása 
        cy.get('button[title="Continue"]').click(); // Tovább az adatok megadásához


        cy.log('Checking if we cant finish our order without filling the details form');
        cy.get('button[title="Continue"]').click(); // Megpróbáljuk adatok nélkül leadni a rendelést
        checkValidationError('#guestFrm_firstname', 'First Name must be greater than 3 and less than 32 characters!'); // First Name mező validáció
        checkValidationError('#guestFrm_lastname', 'Last Name must be greater than 3 and less than 32 characters!'); // Last Name mező validáció
        checkValidationError('#guestFrm_email', 'E-Mail Address does not appear to be valid!'); // Email mező validáció
        checkValidationError('#guestFrm_address_1', 'Address 1 must be greater than 3 and less than 128 characters!'); // Cim mező validáció
        checkValidationError('#guestFrm_city', 'City must be greater than 3 and less than 128 characters!'); // Város mező validáció
        checkValidationError('#guestFrm_zone_id', 'Please select a region / state!'); // Régió mező validáció
        checkValidationError('#guestFrm_postcode', 'Zip/postal code must be between 3 and 10 characters!'); // Irányitószám mező validáció

        
        cy.log('Filling the form with the mandatory details');
        cy.get('#guestFrm_firstname').type('Test'); // First Name mező kitöltés
        cy.get('#guestFrm_lastname').type('User'); // Last Name mező kitöltés
        cy.get('#guestFrm_email').type('test@email.hu'); // Email mező kitöltés
        cy.get('#guestFrm_address_1').type('Test Address'); // Cim mező kitöltés
        cy.get('#guestFrm_city').type('Budapest'); // Város mező kitöltés
        cy.get('#guestFrm_zone_id').select(1); // Régió mező kitöltés
        cy.get('#guestFrm_postcode').type('1131'); // Irányitószám mező kitöltés
        cy.get('button[title="Continue"]').click(); // Tovább a fizetéshez
        

        cy.log('Finish the order');
        cy.get('#checkout_btn').click(); // Rendelés jóváhagyása
        cy.url().should('include', 'checkout/success'); // URL ellenőrzése a sikeres rendelés leadása után
        cy.get('.maintext').should('contain', 'Your Order Has Been Processed!'); // Megerősitő szöveg ellenőrzése

        cy.contains('a', 'invoice page').click(); // Navigáljunk számla oldalra


        cy.log('Checking if the invoice has the correct details');
        cy.get('h1 .maintext').should('contain', 'Order Details'); // Oldalon látszódik-e a cim ellenőrzés

        cy.get('td').should('contain', 'Order ID'); // Ellenőrizzük hogy megvan-e de az érték változó, nem assertálunk rá
        cy.get('td').should('contain', 'Status').and('contain', 'Pending'); // Ellenőrzünk hogy látszódik-e és Pending-e a státusz
        cy.get('td').should('contain', 'E-Mail').and('contain', 'test@email.hu'); // Ellenőrzünk hogy látszódik-e és a formon megadott érték-e az email
        cy.get('td').should('contain', 'Shipping Method').and('contain', 'Flat Shipping Rate'); // Ellenőrzünk hogy látszódik-e a szállitási mód
        cy.get('td').should('contain', 'Payment Method').and('contain', 'Cash On Delivery'); // Ellenőrzünk hogy látszódik-e a fizetési mód

        cy.get('td address').eq(0) // Kiválasztjuk a szálltási cim oszlopot
            .should('contain', 'Test User') // Ellenőrzünk a rendelési formon megadott névre
            .and('contain', 'Test Address') // Ellenőrzünk a rendelési formon megadott cimre
            .and('contain', 'Budapest 1131') // Ellenőrzünk a rendelési formon városra és irsz-re
            .and('contain', 'Aberdeen') // Ellenőrzünk a rendelési formon megadott régióra
            .and('contain', 'United Kingdom'); // Ellenőrzünk a rendelési formon megadott országra (default-on lett hagyva)

        cy.get('td address').eq(1) // Kiválasztjuk a fizetési cim oszlopot
            .should('contain', 'Test User') // Ellenőrzünk a rendelési formon megadott névre
            .and('contain', 'Test Address') // Ellenőrzünk a rendelési formon megadott cimre
            .and('contain', 'Budapest 1131') // Ellenőrzünk a rendelési formon városra és irsz-re
            .and('contain', 'Aberdeen') // Ellenőrzünk a rendelési formon megadott régióra
            .and('contain', 'United Kingdom'); // Ellenőrzünk a rendelési formon megadott országra (default-on lett hagyva)

        cy.get('.invoice_products').within(() => { // A terméklistában
            cy.contains('Curls to straight Shampoo').should('be.visible'); // Ellenőrizzük hogy látszódik-e a termék neve
            cy.contains('PCND004').should('be.visible'); // Ellenőrizzük hogy látszódik-e a modell száma
            cy.contains('1'); // Ellenőrizzük hogy látszódik-e a rendelt mennyiség
        });
        // Dev note: Külön kellett venni mert a csak sima invoice_products osztályt fésülve valamiért csak a unit price-ot találta meg
        cy.get('.invoice_products td').filter(':contains("$4.00")').should('have.length', 2); // Ellenőrizzük hogy látszódik-e a termék egységára, és a summája
        
        cy.get('.pull-right table').within(() => { // Az összegzőben
            cy.get('td').filter((i, el) => el.textContent.trim() === 'Sub-Total:') // Keressük azt a td-t amiben a trimmelt "Sub-Total" szerepel
                .next().should('contain', '$4.00'); // Vesszük a mellette lévő oszlopot és ellenőrizzük hogy tartalmazza e a 4 dollárt
            cy.get('td').filter((i, el) => el.textContent.trim() === 'Flat Shipping Rate:') // Keressük azt a td-t amiben a trimmelt "Flat Shipping Rate" szerepel
                .next().should('contain', '$2.00'); // Vesszük a mellette lévő oszlopot és ellenőrizzük hogy tartalmazza e a 2 dollárt
            cy.get('td').filter((i, el) => el.textContent.trim() === 'Total:') // Keressük azt a td-t amiben a trimmelt "Total" szerepel 
            // dev note: emiatt a sor miatt kellett ez a megoldás mert a sima contains újra megtalálta volna a Sub-Totalt, a részleges egyezés miatt
                .next().should('contain', '$6.00'); // Vesszük a mellette lévő oszlopot és ellenőrizzük hogy tartalmazza e a 6 dollárt
        });

    });
});
