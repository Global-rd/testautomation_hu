# Setup és futtatás lépései


# Cypress config rövid indoklás
    - baseUrl: "https://automationteststore.com/" - A Cypress megpróbálja előtagként használni ezt a baseUrl-t minden olyan URL elé, amelyet a cy.visit() és cy.request() parancsoknak adsz meg, és amelyek nem teljesen minősített tartománynévvel (FQDN) rendelkeznek.
  
    - defaultCommandTimeout: 8000 - Idő ezredmásodpercben, amennyit várni kell, mielőtt a legtöbb DOM-alapú parancs időtúllépés miatt meghiúsul.

# Tesztfájlok listája és tartalma 1-2 mondatban