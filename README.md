# Playwright + Cucumber BDD keretrendszer

Ez a projekt egy kész, jól strukturált Playwright + Cucumber BDD setup a következő alkalmazáshoz:
https://thinking-tester-contact-list.herokuapp.com/

## Követelmények
- Node.js 18+
- NPM

## Telepítés
```bash
npm install
npm run browsers
```

> Alapértelmezett BASE_URL: `https://thinking-tester-contact-list.herokuapp.com`

### Teszt felhasználó
A `fixtures/users.json` fájlban állíts be egy érvényes felhasználót (email + jelszó), amely **létezik** az oldalon.
`support/hooks.js` ben van egy beépített előregsztráció, ami .env paraméterek alapján létrehoz regisztrációt, ha szükséges.

## Futtatás
- Minden teszt:  
  ```bash
  npm test
  ```
- Csak egy tag (pl. @smoke):  
  ```bash
  npx cucumber-js -p default --tags @smoke
  ```
- Riport generálás (JSON -> HTML a `playwright-report/` mappába):  
  ```bash
  npm run test:report
  ```

## Riportok
- Cucumber JSON: `reports/cucumber-report.json`
- HTML riport (multiple-cucumber-html-reporter): `playwright-report/index.html`
- Hibás szcenáriók képernyőképei: `reports/screenshots/`
- (Opcionális) videók: állítsd a `RECORD_VIDEO=1` környezeti változót futtatáskor.

## Struktúra
```
features/
  login.feature
  contacts.feature
  steps/
    login.steps.js
    contacts.steps.js
  support/
    world.js
    hooks.js
fixtures/
  users.json
reports/
  generate-html-report.js
```
