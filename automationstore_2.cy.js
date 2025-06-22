/// <reference types="cypress" />

describe('example automationteststore', () => {
  beforeEach(() => {
    cy.visit('https://automationteststore.com/');
  });

  it('megnyitja a főoldalt', () => {
    cy.contains('Automation Test Store');
  });
});
  beforeEach(() => {
    cy.visit('https://automationteststore.com/');
  });
    it('Megnyitja a főoldalt', () => {
    cy.contains('Automation Test Store');
  });

describe('Skin Care kategoria A-Z rendezes teszt', () => {
  beforeEach(() => {
    cy.visit('https://automationteststore.com/');
  });
it('A-Z rendezes az első három termék ABC sorrendben van', () => {
    
    // Kategoria megnyitasa
    cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=43"]').click();
    
    // Rendezés A-Z
    cy.get('#sort').select('pd.name-ASC');
    
    // Várakozás a rendezésre
    cy.wait(8000);
   
    // Az első három termék nevének lekérése és ellenőrzése
    cy.get('.fixed_wrapper .prdocutname').then($elemek => {
      const termekNevek = [
        $elemek.eq(0).text().trim(),
        $elemek.eq(1).text().trim(),
        $elemek.eq(2).text().trim()
      ];
      const rendezett = [...termekNevek].sort((a, b) => a.localeCompare(b));
      expect(termekNevek).to.deep.equal(rendezett);
    });
  });
});

describe('Kosár teszt - két különböző termék', () => {
  it('Két különböző termék a kosárban, ellenőrzés', () => {
    // Bejelentkezés
    cy.visit('https://automationteststore.com/index.php?rt=account/login');
    cy.get('input[name="loginname"]').type('KAnna1234');
    cy.get('input[name="password"]').type('almafa1234'); 
    cy.get('button[title="Login"]').click();
  
   // 1. termék hozzáadása (Skin Care)
    cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=43"]').click();
    cy.get('.fixed_wrapper .prdocutname').eq(0).click();
    cy.get('a.cart').click();

   // 2. termék hozzáadása (Makeup)
    cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=49"]').click();
    cy.get('.fixed_wrapper .prdocutname').eq(0).click();
    cy.get('a.cart').click();

    // Kosar oldal megnyitasa
    cy.get('#cart_checkout1').click();
    cy.wait(5000);

   // Várt adatok
    const termekek = [
      { nev: 'Absolue Eye Precious Cells', ar: 83.53, db: '1' },
      { nev: 'ck one shock for him Deodorant', ar: 13.14, db: '1' }
    ];

    // Termékek ellenőrzése
    termekek.forEach(({ nev, ar, db }) => {
      cy.get('table.table-striped.table-bordered tbody tr').not(':first').each($row => {
        if ($row.find('td.align_left a').text().trim() === nev) {
          cy.wrap($row).find('td.align_right').eq(0).invoke('text').then(text => {
            expect(parseFloat(text.replace('€', '').trim())).to.eq(ar);
          });
          cy.wrap($row).find('input[type="text"][name^="quantity"]').should('have.value', db);
        }
      });
    });
     // Subtotal ellenőrzése
     it('Subtotal ellenőrzése', () => {
     cy.get('#total_table').contains('Sub-Total:').parent().find('td').last().invoke('text').then((subtotalText) => {
      // subtotalText például: "98.55€"
     const expected = (termekek[0].ar + termekek[1].ar).toFixed(2);
     expect(subtotalText.replace("€", "").trim()).to.eq(expected);
   });
  });
}); 
});

it('A föoldalon pontosan 7 termék kategoria jelenik meg', () => {
 // Kategória ellenőrzése
cy.get('.categorymenu').children().filter(':not(:first)').should('have.length', 7);
});


describe('Regisztrációs űrlap validációs hibák', () => {
  beforeEach(() => {
    cy.visit('https://automationteststore.com/index.php?rt=account/create');
  });

  it('Üres mezők esetén hibaüzenetek jelennek meg', () => {
    cy.get('button[title="Continue"]').click();
    cy.contains('First Name must be between 1 and 32 characters!').should('be.visible');
    cy.contains('E-Mail Address does not appear to be valid!').should('be.visible');
    cy.contains('Password must be between 4 and 20 characters!').should('be.visible');
  });

  it('Érvénytelen email esetén hibaüzenet jelenik meg', () => {
    cy.get('#AccountFrm_firstname').type('Alma');
    cy.get('#AccountFrm_email').type('valami.valami');
    cy.get('#AccountFrm_password').type('jelszo123');
    cy.get('button[title="Continue"]').click();
    cy.contains('E-Mail Address does not appear to be valid!').should('be.visible');
  });
});
