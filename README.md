Canvas Calculator automatizált teszt

Futtatás

1. Telepítsd a függőségeket:
   ```
   npm install
   ```

2. Állítsd be a bemeneti számokat a `cypress/fixtures/calculator.config.json` fájlban.

3. Futtasd a tesztet:
   ```
   npx playwright test
   ```

Követelmények

- Node.js
- A projekt gyökerében legyen a `package.json`, a tesztfájlok, a `canvasCalculator.ts` és a config.

Mit csinál a teszt?

- Megnyitja a canvas-alapú számológépet.
- A configban megadott két számot összeadja a felületen, gombnyomásokkal.
- Az eredményt OCR-ral kiolvassa, és ellenőrzi, hogy helyes-e.