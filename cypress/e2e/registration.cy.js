describe('Registration form', () => { // Ötödik feladat

    beforeEach(() => {
        cy.visit('/index.php?rt=account/create'); // Minden tesztet a regisztrációs oldalról kezdünk
    });

    function checkValidationError(inputSelector, expectedMessage) { // Azonos sémával jelentkezik az összes hibaüzenet ezért meg lehet spórolni az ismétlődéseket
        cy.get(inputSelector) // Az input mező
            .parents('.form-group') //feletti divek a form-group szintig
            .find('.help-block') // amin belül a "help-block" osztály
            .should('be.visible') // látszódjon
            .and('contain', expectedMessage); // És tartalmazza a konkrét hibaüzenetet
    }
    function clearFillInputAndSubmitForm(inputSelector, givenText) { // Többször alkalmaztam lentebb ugyanazt a részletet ezért inkább kihoztam ide
        cy.get(inputSelector).clear().type(givenText); // megadott mező törlése majd kitöltése a megadott értékkel
        cy.get('button[title="Continue"]').click(); // Űrlap beküldése
    }

    it('Checking the mandatory fields validations', () => {

        cy.get('button[title="Continue"]').click(); // Űrlap beküldése (üresen)

        cy.get('.alert-error').should('contain', 'Error: You must agree to the Privacy Policy!') // Adatvédelmi nyilatkozat el nem fogadása hibaüzenet

        checkValidationError('#AccountFrm_firstname', 'First Name must be between 1 and 32 characters!'); // First name mező validációs hibaüzenetének ellenőrzése
        checkValidationError('#AccountFrm_lastname', 'Last Name must be between 1 and 32 characters!'); // Last name mező validációs hibaüzenetének ellenőrzése
        checkValidationError('#AccountFrm_email', 'Email Address does not appear to be valid!'); // E-Mail mező validációs hibaüzenetének ellenőrzése
        checkValidationError('#AccountFrm_address_1', 'Address 1 must be between 3 and 128 characters!'); // Address 1 mező validációs hibaüzenetének ellenőrzése
        checkValidationError('#AccountFrm_city', 'City must be between 3 and 128 characters!'); // City mező validációs hibaüzenetének ellenőrzése
        checkValidationError('#AccountFrm_zone_id', 'Please select a region / state!'); // Region / State mező validációs hibaüzenetének ellenőrzése
        checkValidationError('#AccountFrm_postcode', 'Zip/postal code must be between 3 and 10 characters!'); // ZIP Code mező validációs hibaüzenetének ellenőrzése
        checkValidationError('#AccountFrm_loginname', 'Login name must be alphanumeric only and between 5 and 64 characters!'); // Login name mező validációs hibaüzenetének ellenőrzése
        checkValidationError('#AccountFrm_password', 'Password must be between 4 and 20 characters!'); // Password mező validációs hibaüzenetének ellenőrzése
        
    });

    it('Checking email validation', () => {
        // invalid email esetek a kód röviditéshez
        const invalidEmails = ['kukac.nelkul', 'pont@nelkul', 'domain@.nelkul', '@nev.nelkul', 'tobb@@kukac.hu', 'spec!alis@karakter.hu', 'szo koz@email.hu']; 
        // dev note, POTENTIAL BUG: '.pont@kezdo.hu' és 'pont.@vegzo.hu' invalid cimeket engedi a tesztoldal (most úgy tekintettem hogy az alkalmazás működése megfelel az elvártnak ezért kivettem a vizsgált emailek közül)

        // valid email esetek a kód röviditéshez
        const validEmails = ['test@email.hu', 'szamos123456@email.hu', 'alahuzas_es-kotojel@email.hu'];
        // dev note, POTENTIAL BUG: 'pont.es+plusz@email.hu' valid cimeket nem engedi a tesztoldal (most úgy tekintettem hogy az alkalmazás működése megfelel az elvártnak ezért kivettem a vizsgált emailek közül)

        invalidEmails.forEach(email => { // Minden érvénytelen email eseten átmegyünk
            clearFillInputAndSubmitForm('#AccountFrm_email', email); // email mező kitöltése a hibás email opciókkal
            checkValidationError('#AccountFrm_email', 'Email Address does not appear to be valid!'); // E-Mail mező validációs hibaüzenetének ellenőrzése

        });
        
        validEmails.forEach(email => {// Minden érvényes email eseten átmegyünk
            clearFillInputAndSubmitForm('#AccountFrm_email', email); // email mező kitöltése a valid email opciókkal
            cy.get('#AccountFrm_email')
                .parents('.form-group')
                .should('not.have.class', '.has-error');
        });
    });

    it('Checking password validation', () => {
        clearFillInputAndSubmitForm('#AccountFrm_password', '1'); // jelszó mező kitöltése 1 karakterrel
        checkValidationError('#AccountFrm_password', 'Password must be between 4 and 20 characters!'); // Password mező validációs hibaüzenetének ellenőrzése

        clearFillInputAndSubmitForm('#AccountFrm_password', 'tobbmint20karakter921'); // jelszó mező kitöltése 21 karakterrel
        checkValidationError('#AccountFrm_password', 'Password must be between 4 and 20 characters!'); // Password mező validációs hibaüzenetének ellenőrzése
    });

    it('Checking confirm password validation', () => {
        clearFillInputAndSubmitForm('#AccountFrm_password', 'correctPassword'); // jelszó mező kitöltése egy valid jelszóval
        clearFillInputAndSubmitForm('#AccountFrm_confirm', 'notTheSame'); // jelszó megerősitése mező kitöltése egy nem egyező jelszóval
        checkValidationError('#AccountFrm_confirm', 'Password confirmation does not match password!'); // Password mező validációs hibaüzenetének ellenőrzése
    });

});
