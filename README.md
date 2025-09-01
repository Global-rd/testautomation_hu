1. Canvas alapú kalkulátor tesztelése
Ez a projekt egy automatizált tesztkészletet tartalmaz,
amely a Playwright keretrendszert használja egy Canvas alapú kalkulátor alkalmazás működésének ellenőrzésére
OCR segítségével.

2. Követelmények
Node.js (ajánlott: LTS verzió)
npm
3. Főbb csomagok:
@playwright/test – teszteléshez
tesseract.js – OCR felismeréshez
@types/node – Node.js típusdefiníciók
4. Telepítés
npm install
npm install tesseract.js

5. Teszt UI használata:
npx playwright test --project=firefox --ui

6. Fő funkciók
Kalkulátor gombjainak automatikus kattintása a canvas-on
OCR felismerés a Tesseract.js segítségével
Eredmények összevetése az elvárt értékekkel
7. Tippek és hibakezelés
Ha az OCR eredmény nem megfelelő, ellenőrizd a gombok koordinátáit a support/keys.js fájlban.
A tesztadatokat a tests/fixture/numbers.json fájlban módosíthatod.
8. Fejlesztői parancsok
Tesztek futtatása:
npx playwright test
9.Tesztjelentés megtekintése:
npx playwright show-report
