// Vendégként való vásárlás tesztelése
describe('CheckoutFlow', () => {

    const linkShampoo = ('https://automationteststore.com/index.php?rt=product/product&keyword=shampoo&category_id=0&product_id=74')
    
    beforeEach(() =>{

        cy.visit('https://automationteststore.com');
    })

    //A keresés funkció tesztelése
    it('Product search', ()=> {

        cy.get('#filter_keyword').should('be.visible').click().type('shampoo').trigger('input');
        cy.get('#filter_keyword').should('have.value', 'shampoo');
        cy.get('.button-in-search').click();
        
    });

    //A termék kiválasztása a névre kattintással és a review ellenőrzése
    it('Product selection', () => {
        cy.visit('https://automationteststore.com/index.php?rt=product/search&keyword=shampoo&category_id=0');
        cy.get('.thumbnails.grid.row.list-inline').should('exist');
        // A termékoldalon a Curls to straight Shampoo megjelenésének ellenőrzése és megnyitása
        cy.contains('.col-md-3.col-sm-6.col-xs-12 a', 'Curls to straight Shampoo').click();
        //A részletező oldal ellenőrzése
        cy.get('#description').should('be.visible');
        // A review fülre kattintás és ellenőrzés
        cy.get('a[href="#review"]').click();
        cy.get('.tab-content').should('be.visible');
        // Ellenőrizzük, hogy létezik - e korábbi review a termékről
        cy.get('#current_reviews').should('be.visible');
        
    });

    //A termék kosárba helyezése
    it('Add to cart', () => {

        cy.visit(linkShampoo);
        cy.get('a.cart').contains('Add to Cart').should('be.visible').click();
        


    });

    //A checkout folyamat tesztelése
    it('Chechout', () => {
        
        cy.visit(linkShampoo);
        cy.get('a.cart').contains('Add to Cart').should('be.visible').click();
        cy.get('#cart_checkout2').should('be.visible').click();
    });

    //Vendégként való vásárlás bejelentkezés nélkül
    it('Guest Checkout', () => {

        cy.visit(linkShampoo);
        cy.get('a.cart').contains('Add to Cart').should('be.visible').click();
        cy.get('#cart_checkout2').should('be.visible').click();
        cy.get('#accountFrm_accountguest').should('be.visible').click();
        cy.get('button[title="Continue"]').should('be.visible').click();

    });


    it('Guest Checkout Form', () => {
        //A "Guest Checkout" űrlap ellenőrzése

        cy.visit(linkShampoo);
        cy.get('a.cart').contains('Add to Cart').should('be.visible').click();
        cy.get('#cart_checkout2').should('be.visible').click();
        cy.get('#accountFrm_accountguest').should('be.visible').click();
        cy.get('button[title="Continue"]').should('be.visible').click();

        
        // Ellenőrizzük, hogy a "Guest Checkout" űrlap látható
        cy.get('#guestFrm_firstname').should('be.visible');
        cy.get('#guestFrm_lastname').should('be.visible');
        cy.get('#guestFrm_email').should('be.visible');
        cy.get('#guestFrm_address_1').should('be.visible');
        cy.get('#guestFrm_country_id').should('be.visible');
        cy.get('#guestFrm_zone_id').should('be.visible');
        cy.get('#guestFrm_postcode').should('be.visible');
        cy.get('#guestFrm_city').should('be.visible');

        //A "Guest Checkout" űrlap kitöltése
        cy.get('#guestFrm_firstname').type('Anna');
        cy.get('#guestFrm_lastname').type('Kovacs');
        cy.get('#guestFrm_email').type('annak@gmail.com');
        cy.get('#guestFrm_address_1').type('Rakoczi utca 1.');
        

        //A "Country" mező kiválasztása
        cy.get('#guestFrm_country_id')
          .select('Hungary')
          .should('have.value', '97');

        //A "Region / State" mező kiválasztása  
        cy.get('#guestFrm_zone_id')
        .select('Budapest')
        .should('have.value', '1433');

        //A "ZIP Code" mező kitöltése
        cy.get('#guestFrm_postcode').type('1234');

        //A "City" mező kitöltése
        cy.get('#guestFrm_city').type('Budapest');

        cy.get('button[title="Continue"]').should('be.visible').click();
        cy.get('button[title="Confirm Order"]').should('be.visible').click();

        cy.contains('.container-fluid', 'Your Order Has Been Processed!').should('be.visible');
        cy.contains('a', 'invoice page').should('be.visible').click();

        //Ellenőrizzük, hogy az "Order Details" oldal megjelenik
        cy.get('.maintext').should('contain', 'Order Details');

        //Ellenőrizzük, hogy a rendelés részletei láthatóak
        cy.get('.table.table-bordered').should('be.visible');
        //Ellenőrizzük, hogy a termék neve szerepel a rendelés részletei között
        cy.get('.invoice_products.table.table-striped.table-bordered td').contains('Curls to straight Shampoo').should('exist');
    
        //Az ár ellenőrzése
        cy.contains('$4.00').should('exist');
        





        
        
        

    });
}); 