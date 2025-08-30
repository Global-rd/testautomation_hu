# Parabank Automatizált Tesztelés – Cypress

Ez a projekt a Parabank demó alkalmazás funkcionális tesztelésére készült, Cypress segítségével, UI- és API-rétegen keresztül.

Tesztelendő alkalmazás: https://parabank.parasoft.com/

---

## Projekt felépítése
parabanksoft-tesztelés
├── cypress/
│ ├── e2e/
│ │ ├── ui/ # UI tesztek
│ │ ├── api/ # API tesztek
│ │ └── combined/ # UI + API tesztek (ebben mondjuk vannak kétségeim)
│ ├── fixtures/ # Tesztadat fájlok (user.json, account.json)
│ └── support/
│   ├── commands.js Egyedi Cypress parancsok (pl. registerUser)
│   └── e2e.js 
├── cypress.config.js # Cypress beállítások
└── README.md 

Tesztelt funkciók
1	Új számla nyitása (3000 USD)
2	Savings számla nyitás	
3	Pénzátutalás – overdraft	
4	Kölcsön igénylés – részleges kötelező mező
5	Profil frissítése kizárólag API-n keresztül	
6	Azonos számlára utalás megakadályozása

Egyedi Cypress parancsok
A cypress/support/commands.js fájl tartalmaz újrahasznosítható parancsokat:
    cy.registerUser(); // Új user regisztrálása EPOCH idő alapján