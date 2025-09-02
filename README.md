# Canvas Calculator OCR Tesztelés

Ez a projekt egy Playwright-alapú automatizált tesztkészlet, amely egy Canvas-alapú kalkulátor alkalmazás működését és OCR felismerését ellenőrzi.

## Követelmények

- Node.js (ajánlott: LTS verzió)
- npm

## Főbb szükséges csomagok:

- @playwright/test – Playwright teszteléshez
- tesseract.js – OCR felismeréshez
- @types/node – Node.js típusdefiníciók 

## Telepítés

1. npm install
2. npm install tesseract.js


## Struktúra

- `tests/` – Tesztfájlok (pl. `ocr.spec.js`)
- `tests/fixture/` – Tesztadatok (pl. `numbers.json`)
- `support/` – Segédfüggvények és gombkoordináta logika
- `playwright.config.js` – Playwright konfiguráció

## Tesztek futtatása

Firefox böngészővel:
```sh
npx playwright test --project=firefox
```

Teszt UI használata:
```sh
npx playwright test --project=firefox --ui
```

## Fő funkciók

- Kalkulátor gombok automatikus kattintása canvas-on
- OCR felismerés Tesseract.js segítségével
- Eredmény összehasonlítása várt értékkel

## Hibák, tippek

- Ha az OCR eredmény hibás, ellenőrizd a gombkoordinátákat a `support/keys.js`-ben.
- A tesztadatokat a `test/fixture/numbers.json` fájlban tudod módosítani.

## Fejlesztői parancsok

- Tesztek futtatása: `npx playwright test`
- Tesztjelentés megtekintése: `npx playwright show-report`

---

**Készítette:** Györgyi Palatinus  