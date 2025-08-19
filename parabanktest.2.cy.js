// Uj számla nyitása és ellenőrzése
describe('Új számla nyitása', () => {
  it('Checking számla nyitása és ellenőrzés', () => {
    cy.fixture('testData').then(({ testUser, initialBalance }) => {
      cy.loginUI(testUser.username, testUser.password);

      cy.interceptAccounts();
      cy.contains('Open New Account').click();
      cy.get('#type').select('CHECKING');
      cy.get('input[type="submit"]').click();

      // UI ellenőrzés
      cy.get('#newAccountId').invoke('text').then(accId => {
        cy.verifyAccountUI(accId, initialBalance);

        // API ellenőrzés
        cy.wait('@getAccounts').its('response.body').then(accounts => {
          const account = accounts.find(a => a.id === parseInt(accId));
          expect(account).to.exist;
          expect(account.balance).to.eq(initialBalance);
        });
      });
    });
  });
});

// Savings számla nyitása és ellenőrzése
describe('Savings számla nyitása', () => {
  it('UI és API ellenőrzés', () => {
    cy.fixture('testData').then(({ testUser, initialBalance }) => {
      cy.loginUI(testUser.username, testUser.password);

      cy.interceptAccounts();
      cy.contains('Open New Account').click();
      cy.get('#type').select('SAVINGS');
      cy.get('input[type="submit"]').click();

      cy.get('#newAccountId').invoke('text').then(accId => {
        cy.verifyAccountUI(accId, initialBalance);

        cy.wait('@getAccounts').its('response.body').then(accounts => {
          const account = accounts.find(a => a.id === parseInt(accId));
          expect(account).to.exist;
          expect(account.type).to.eq('SAVINGS');
        });
      });
    });
  });
});

//Pénzátutalás – overdraft ellenőrzése
describe('Pénzátutalás – overdraft', () => {
  it('Negatív egyenleg ellenőrzése', () => {
    cy.fixture('testData').then(({ testUser, transferAmount }) => {
      cy.loginUI(testUser.username, testUser.password);

      cy.interceptTransfer();
      cy.contains('Transfer Funds').click();

      cy.get('#fromAccountId').then($el => {
        const fromId = $el.find('option').eq(0).val();
        const toId = $el.find('option').eq(1).val();

        cy.get('#fromAccountId').select(fromId);
        cy.get('#toAccountId').select(toId);
        cy.get('#amount').type(transferAmount);
        cy.get('input[type="submit"]').click();

        cy.contains('Transfer Complete').should('exist');

        cy.wait('@transfer').its('response.body').then(res => {
          expect(res.fromAccountBalance).to.be.lessThan(0);
        });

        cy.verifyAccountUI(fromId, transferAmount * -1); // UI-n is ellenőrzés
      });
    });
  });
});

//Kölcsön igénylés – Loan Amount és Down Payment kitöltéssel
describe('Kölcsön igénylés', () => {
  it('Loan Amount kitöltéssel', () => {
    cy.fixture('testData').then(({ loanAmount }) => {
      cy.loginUI('testuser123', 'Password123!');
      cy.interceptLoan();
      cy.contains('Request Loan').click();

      cy.get('#loanAmount').type(loanAmount);
      cy.get('input[type="submit"]').click();

      cy.contains('Congratulations, your loan has been approved.').should('exist');

      cy.wait('@requestLoan').its('response.body').should('include', { approved: true });
    });
  });

  it('Down Payment kitöltéssel', () => {
    cy.fixture('testData').then(({ downPayment }) => {
      cy.loginUI('testuser123', 'Password123!');
      cy.interceptLoan();
      cy.contains('Request Loan').click();

      cy.get('#downPayment').type(downPayment);
      cy.get('input[type="submit"]').click();

      cy.contains('Congratulations, your loan has been approved.').should('exist');

      cy.wait('@requestLoan').its('response.body').should('include', { approved: true });
    });
  });
});

//Profil frissítés API-n keresztül
describe('Profil frissítés API-n keresztül', () => {
  it('UI és API ellenőrzés', () => {
    cy.fixture('testData').then(({ testUser }) => {
      cy.request('POST', 'https://parabank.parasoft.com/parabank/services/bank/updateProfile', {
        username: testUser.username,
        address: '123 Test St',
        city: 'Testville'
      }).then(res => {
        expect(res.body.message).to.eq('Successfully updated customer profile');

        cy.loginUI(testUser.username, 'Password123!');
        cy.contains('Update Contact Info').click();
        cy.get('#customerAddress').should('have.value', '123 Test St');
      });
    });
  });
});

//Pénzátutalás – azonos számla ellenőrzése
describe('Pénzátutalás – azonos számla', () => {
  it('Hibakezelés ellenőrzése', () => {
    cy.loginUI('testuser123', 'Password123!');
    cy.interceptTransfer();
    cy.contains('Transfer Funds').click();

    cy.get('#fromAccountId').then($el => {
      const accId = $el.find('option').eq(0).val();
      cy.get('#fromAccountId').select(accId);
      cy.get('#toAccountId').select(accId);
      cy.get('#amount').type(100);
      cy.get('input[type="submit"]').click();

      cy.get('.error').should('contain.text', 'cannot be the same account');

      cy.wait('@transfer').its('response.body').should('include', { error: 'Cannot transfer to the same account' });
    });
  });
});


