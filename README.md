# Setup és futtatás lépései
    Cypress telepítés  - 'npm install cypress --save-dev'
    Cypress első futtatás a configurációs fájlok létrehozásához - 'npm cypress open'
    A tesztek futtatása UI felületen. 
        'npx cypress open'
        'E2E Testing' kiválasztása
        'Start E2E Testing in ...'
    Tesztek futtatása.
        automatimationteststore.cy.js
        guestCheckoutFlow.cy.js

    Tesztek futtatása parancssorból.
        'npx cypress run'

# Cypress config rövid indoklás
    - baseUrl: "https://automationteststore.com/" - A Cypress megpróbálja előtagként használni ezt a baseUrl-t minden olyan URL elé, amelyet a cy.visit() és cy.request() parancsoknak adsz meg, és amelyek nem teljesen minősített tartománynévvel (FQDN) rendelkeznek.
  
    - defaultCommandTimeout: 12000 - Idő ezredmásodpercben, amennyit várni kell, mielőtt a legtöbb DOM-alapú parancs időtúllépés miatt meghiúsul.

# Tesztfájlok listája és tartalma 1-2 mondatban