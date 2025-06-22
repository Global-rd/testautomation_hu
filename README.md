1. Setup és futtatás lépései
- Node.js telepítés
- Cypress telepítése: npm install cypress --save-dev
- Cypress megnyitása, configolása: npx cypress open
- cypress.config.js fájlban config paraméterek megadása

2. Cypress config rövid indoklás
- baseUrl: a tesztel alkalmazás főoldalának megadása, hogy a tesztek kiindulópontját ne kelljen minden teszt során megadni.
- defaultCommandTimeout: alapértelmezett érték megadása, hogy a teszt meddig várjon az utasítások végrehajtására mielőtt timeout-ol.

3. Tesztfájlok listája és tartalma
- homework.cy.js -> 2-5 feladatokat tartalmazza (minden "it" egy külön feladat végrehajtására fókuszál)
- guestCheckoutFlow.cy.js -> 6. feladat végigvezetését tartalmazza 1 robosztus tesztesetben.
