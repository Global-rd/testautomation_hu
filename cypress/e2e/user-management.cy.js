import {generateUniqueId} from "../support/utils/services";

describe('Shopping and cart checkout', () => {

    beforeEach(() => {
        cy.visit('/');
    })

    it('UM01 - can navigate to register/login page', () => {
        cy.get("#customer_menu_top").click();

        cy.url().should('include', 'account/login');
    });

    it('UM02 - can register new user', () => {
        cy.get("#customer_menu_top").click();

        cy.contains('button', /Continue/i).click();

        cy.get("#AccountFrm_firstname").type("First name");
        cy.get("#AccountFrm_lastname").type("Last name");
        cy.get("#AccountFrm_email").type(`${generateUniqueId('email')}@email.com`);
        cy.get("#AccountFrm_address_1").type("Random street 5");
        cy.get("#AccountFrm_city").type("Budapest");
        cy.get("#AccountFrm_country_id").select("Hungary");
        cy.get("#AccountFrm_zone_id").select("Pest");
        cy.get("#AccountFrm_postcode").type("1118");
        cy.get("#AccountFrm_loginname").type(`${generateUniqueId('user')}`);
        cy.get("#AccountFrm_password").type("123456789");
        cy.get("#AccountFrm_confirm").type("123456789");
        cy.get("#AccountFrm_newsletter0").click();
        cy.get("#AccountFrm_agree").click();

        cy.contains('button', /Continue/i).click();

        cy.url().should('include', 'account/success');
        cy.get(".maintext").should('contain.text', 'Created');
    });

    it('UM03 - should fail on invalid email address', () => {
        cy.get("#customer_menu_top").click();

        cy.contains('button', /Continue/i).click();

        cy.get("#AccountFrm_firstname").type("First name");
        cy.get("#AccountFrm_lastname").type("Last name");
        cy.get("#AccountFrm_email").type("abc");
        cy.get("#AccountFrm_address_1").type("Random street 5");
        cy.get("#AccountFrm_city").type("Budapest");
        cy.get("#AccountFrm_country_id").select("Hungary");
        cy.get("#AccountFrm_zone_id").select("Pest");
        cy.get("#AccountFrm_postcode").type("1118");
        cy.get("#AccountFrm_loginname").type(`${generateUniqueId('user')}`);
        cy.get("#AccountFrm_password").type("123456789");
        cy.get("#AccountFrm_confirm").type("123456789");
        cy.get("#AccountFrm_newsletter0").click();
        cy.get("#AccountFrm_agree").click();

        cy.contains('button', /Continue/i).click();

        cy.url().should('not.include', 'account/success');
        cy.url().should('include', 'account/create');

        cy.get('.alert.alert-error.alert-danger')
            .should('be.visible')
            .and('contain.text', 'Email Address does not appear to be valid!');

        cy.get('.alert.alert-error.alert-danger button.close')
            .should('be.visible')
            .and('contain.text', '×');
    });


    it('UM04 - should fail on invalid password', () => {
        cy.get("#customer_menu_top").click();

        cy.contains('button', /Continue/i).click();

        cy.get("#AccountFrm_firstname").type("First name");
        cy.get("#AccountFrm_lastname").type("Last name");
        cy.get("#AccountFrm_email").type(`${generateUniqueId('email')}@email.com`);
        cy.get("#AccountFrm_address_1").type("Random street 5");
        cy.get("#AccountFrm_city").type("Budapest");
        cy.get("#AccountFrm_country_id").select("Hungary");
        cy.get("#AccountFrm_zone_id").select("Pest");
        cy.get("#AccountFrm_postcode").type("1118");
        cy.get("#AccountFrm_loginname").type(`${generateUniqueId('user')}`);
        cy.get("#AccountFrm_password").type("12");
        cy.get("#AccountFrm_confirm").type("12");
        cy.get("#AccountFrm_newsletter0").click();
        cy.get("#AccountFrm_agree").click();

        cy.contains('button', /Continue/i).click();

        cy.url().should('not.include', 'account/success');
        cy.url().should('include', 'account/create');

        cy.get('.alert.alert-error.alert-danger')
            .should('be.visible')
            .and('contain.text', 'Password must be between 4 and 20 characters!');

        cy.get('.alert.alert-error.alert-danger button.close')
            .should('be.visible')
            .and('contain.text', '×');
    });


    it('UM05 - should fail when required field is empty', () => {
        cy.get("#customer_menu_top").click();

        cy.contains('button', /Continue/i).click();

        cy.get("#AccountFrm_firstname").type("First name");
        cy.get("#AccountFrm_lastname").type("Last name");
        cy.get("#AccountFrm_email").type(`${generateUniqueId('email')}@email.com`);
        cy.get("#AccountFrm_city").type("Budapest");
        cy.get("#AccountFrm_country_id").select("Hungary");
        cy.get("#AccountFrm_zone_id").select("Pest");
        cy.get("#AccountFrm_postcode").type("1118");
        cy.get("#AccountFrm_loginname").type(`${generateUniqueId('user')}`);
        cy.get("#AccountFrm_password").type("12346789");
        cy.get("#AccountFrm_confirm").type("123456789");
        cy.get("#AccountFrm_newsletter0").click();
        cy.get("#AccountFrm_agree").click();

        cy.contains('button', /Continue/i).click();

        cy.url().should('not.include', 'account/success');
        cy.url().should('include', 'account/create');

        cy.get('.alert.alert-error.alert-danger')
            .should('be.visible')
            .and('contain.text', 'Address 1 must be between 3 and 128 characters!');

        cy.get('.alert.alert-error.alert-danger button.close')
            .should('be.visible')
            .and('contain.text', '×');
    });


    it('UM06 - should fail when password confirmation is not a match', () => {
        cy.get("#customer_menu_top").click();

        cy.contains('button', /Continue/i).click();

        cy.get("#AccountFrm_firstname").type("First name");
        cy.get("#AccountFrm_lastname").type("Last name");
        cy.get("#AccountFrm_email").type(`${generateUniqueId('email')}@email.com`);
        cy.get("#AccountFrm_address_1").type("Random street 5");
        cy.get("#AccountFrm_city").type("Budapest");
        cy.get("#AccountFrm_country_id").select("Hungary");
        cy.get("#AccountFrm_zone_id").select("Pest");
        cy.get("#AccountFrm_postcode").type("1118");
        cy.get("#AccountFrm_loginname").type(`${generateUniqueId('user')}`);
        cy.get("#AccountFrm_password").type("123456789");
        cy.get("#AccountFrm_confirm").type("123476589");
        cy.get("#AccountFrm_newsletter0").click();
        cy.get("#AccountFrm_agree").click();

        cy.contains('button', /Continue/i).click();

        cy.url().should('not.include', 'account/success');
        cy.url().should('include', 'account/create');

        cy.get('.alert.alert-error.alert-danger')
            .should('be.visible')
            .and('contain.text', 'Password confirmation does not match password!');

        cy.get('.alert.alert-error.alert-danger button.close')
            .should('be.visible')
            .and('contain.text', '×');
    });


})