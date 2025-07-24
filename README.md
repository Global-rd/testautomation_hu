# testautomation_hu
1. Telepítések:
Függőségek telepítése: 
npm install
Szükséges csomagok telepítése: 
npm install @cucumber/cucumber @playwright/test playwright
npm install --save-dev @cucumber/html-formatter
Playwright browser telepítése: 
npx playwright install

2. Tesztek futtatása: 
npm run test
npm run cucumber

3. Mit tesztel: 
Playwright + Cucumber tesztkeretrendszerrel épített
automatizált tesztekkel lefedi a következő webalkalmazás funkcióit:
https://thinking-tester-contact-list.herokuapp.com/
 a. Login.feature
○ Sikeres login teszt valós felhasználóval
○ Sikertelen login hibás jelszóval
 b. contacts.feature
○ Új kontakt létrehozása
○ Kontakt szerkesztése
○ Kontakt törlése