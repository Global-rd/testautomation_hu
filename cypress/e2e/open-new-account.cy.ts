import {LogInService} from "../support/services/log-in-service";
import {UserType} from "../support/model/User";
import {LoginPage} from "../pages/LoginPage";
import {OverviewPage} from "../pages/OverviewPage";
import {NewAccountPage} from "../pages/NewAccountPage";

describe('Opening new account for user', () => {

    let loginPage: LoginPage;
    let overviewPage: OverviewPage;
    let newAccountPage: NewAccountPage;

    before(() => {
        loginPage = new LoginPage(UserType.admin);
        overviewPage = new OverviewPage();
        newAccountPage = new NewAccountPage();

        loginPage.login();
    })

    it('OA001 - registered user is allowed to open a new account', () => {
        overviewPage.verifyPageUrl();
        overviewPage.goToNewAccount();
        newAccountPage.verifyPageUrl();

    });

    it('OA002 - registered user can open new account using UI', () => {

    });

    it('OA003 - new account creation API returns new account with default balance', () => {

    });

    it('OA004 - new account opens successfully and displays the default balance', () => {

    });

    it('OA005 - new account listed on Account Overview page', () => {

    });

    /*it('GCO02 - can open details page of item', () => {
        cy.get("#filter_keyword").type(`${searchWord2}{enter}`);

        cy.contains('.prdocutname', productType2)
            .then(productNameLink => {
                cy.wrap(productNameLink).click();
            });

        cy.url().should('include', `product_id=74`);
    });

    it('GCO03 - displays reviews on review tab of details page', () => {
        cy.get("#filter_keyword").type(`${searchWord2}{enter}`);

        cy.contains('.prdocutname', productType2)
            .then(productNameLink => {
                cy.wrap(productNameLink).click();
            });

        cy.get('[href="#review"]').click();
        cy.get('#current_reviews').should('contain.text', 'Stefania');
        cy.get('#current_reviews').should('contain.text', 'moisturing');
    });


    it('GCO04 - can add item to cart from the search results', () => {
        cy.get("#filter_keyword").type(`${searchWord1}{enter}`);

        addItemToCartFromSearch(productType1);

        cy.get('.topcart .cart_total').filter(':visible').invoke('text').should('equal', `$${price.toFixed(2 )}`);
    });

    it('GCO05 - can start check out process', () => {
        cy.get("#filter_keyword").type(`${searchWord1}{enter}`);

        addItemToCartFromSearch(productType1);

        cy.get('.topcart .cart_total').filter(':visible').click();

        cy.url().should('include', 'checkout/cart');
    });

    it('GCO06 - can move on to checkout as guest', () => {
        cy.get("#filter_keyword").type(`${searchWord1}{enter}`);

        addItemToCartFromSearch(productType1);

        cy.get('.topcart .cart_total').filter(':visible').click();
        cy.get('#cart_checkout1').click();

        cy.url().should('include', 'account/login');

        cy.get('#accountFrm_accountguest').click();
        cy.contains('button', /Continue/i).click();

        cy.url().should('include', 'checkout/guest_step_1');
    });

    it('GCO07 - can submit in guest check out form', () => {
        cy.get("#filter_keyword").type(`${searchWord1}{enter}`);

        addItemToCartFromSearch(productType1);

        cy.get('.topcart .cart_total').filter(':visible').click();
        cy.get('#cart_checkout1').click();
        cy.get('#accountFrm_accountguest').click();
        cy.contains('button', /Continue/i).click();

        fillOutGuestForm();

        cy.contains('button', /Continue/i).click();
        cy.url().should('include', 'checkout/guest_step_3');
    });

    it('GCO08 - can place order as guest', () => {
        cy.get("#filter_keyword").type(`${searchWord1}{enter}`);

        addItemToCartFromSearch(productType1);

        cy.get('.topcart .cart_total').filter(':visible').click();
        cy.get('#cart_checkout1').click();
        cy.get('#accountFrm_accountguest').click();
        cy.contains('button', /Continue/i).click();

        fillOutGuestForm();

        cy.contains('button', /Continue/i).click();
        cy.get("#checkout_btn").click();

        cy.url().should('include', 'checkout/success');
        cy.get(".maintext").should('contain.text', 'Processed');
    });

    it('GCO09 - invoice page contains correct details', () => {
        cy.get("#filter_keyword").type(`${searchWord1}{enter}`);

        addItemToCartFromSearch(productType1);

        cy.get('.topcart .cart_total').filter(':visible').click();
        cy.get('#cart_checkout1').click();
        cy.get('#accountFrm_accountguest').click();
        cy.contains('button', /Continue/i).click();

        fillOutGuestForm();

        cy.contains('button', /Continue/i).click();
        cy.get("#checkout_btn").click();

        cy.contains('a', 'invoice page')
            .should('be.visible')
            .click();

        cy.url().should('include', 'account/invoice');

        cy.get('address').as('addressContent');

        cy.get('@addressContent').should('contain.text', 'First Last');
        cy.get('@addressContent').should('contain.text', 'Random street 5');
        cy.get('@addressContent').should('contain.text', 'Budapest');
        cy.get('@addressContent').should('contain.text', 'Hungary');

        cy.get('.invoice_products > tbody > tr').eq(1).children().eq(1).children().eq(0).should('contain.text', productTypeName);
    });


    function fillOutGuestForm(){
        cy.get("#guestFrm_firstname").type("First");
        cy.get("#guestFrm_lastname").type("Last");
        cy.get("#guestFrm_email").type(`${generateUniqueId('email')}@email.com`);
        cy.get("#guestFrm_address_1").type("Random street 5");
        cy.get("#guestFrm_city").type("Budapest");
        cy.get("#guestFrm_country_id").select("Hungary");
        cy.get("#guestFrm_zone_id").select("Pest");
        cy.get("#guestFrm_postcode").type("1118");
    }
    function addItemToCartFromSearch(productType){
        cy.contains('.prdocutname', productType)
            .then(productNameLink => {
                cy.wrap(productNameLink)
                    .closest('.col-md-3')
                    .as('productCard');

                cy.get('@productCard')
                    .find('.productcart[title="Add to Cart"]')
                    .should('be.visible')
                    .click();
            });
    }*/

});