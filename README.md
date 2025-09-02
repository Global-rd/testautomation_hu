# Canvas Calculator E2E (Playwright + TypeScript + OCR)

Ez a projekt a https://www.online-calculator.com/full-screen-calculator/ canvas alapú számológépét teszteli.
A gombnyomások koordinátákkal történnek (CanvasClickHelper), az eredmény pedig OCR-rel (tesseract.js) kerül kiolvasásra.

## Követelmények
- Node 22.18.0
- `npx playwright install --with-deps` futtatása az első indítás előtt

## Telepítés és futtatás
```bash
npm i
npm run prepare
# .env beállítható az .env.example alapján (nem kötelező)
npm test
```

## Struktúra
- `src/utils/CanvasClickHelper.ts` – generikus, típusos canvas kattintó helper (T koordináta-térképpel)
- `src/utils/coords.ts` – gombok koordinátatérképe
- `src/utils/ocrHelper.ts` – OCR segédfüggvények
- `src/utils/math.ts` – segédfüggvény elvárt eredmény számolásához
- `src/utils/expectCalculation.ts` – segédfüggvény tizedes kerekítésre és negatív előtag lekezelésére
- `src/utils/calculatorStarter.ts` – előkészíti a Page + Service párost
- `src/pages/CalculatorPage.ts` – Page Object (pressNumber, pressOperation, getResult)
- `src/services/CalculatorService.ts` – Service réteg, .env/fixture betöltés + művelet végrehajtás
- `src/pages/CookieConsent.ts` – Cookie popup és hirdetés kezelése
- `tests/calculator.spec.ts` – Playwright tesztek (.env és .json testdata verziókkal)
- `fixtures/calcData.json` – minta tesztadatok

## Megjegyzések
- A `buttonCoords` normalizált koordináták a canvas szélességére/magasságára.
  Ha az oldal elrendezése változik, itt kell módosítani.
- Az OCR a canvas felső kijelző részét vágja ki, az előfeldolgozás binarizálással és
  vastagítással segít a vékony mínuszjelek felismerésében.
- A tesztben egyedi matcher `toBeCalcResult` van:
    - az elvárt és kapott értékeket 8 tizedesre kerekíti (ennyit kezel a kalkulátor maximum)
    - ha nem egyezik a végeredmény az elvárttal, negált értékkel is ellenőriz (OCR-nél nem tudtam megoldani, hogy felismerje a negatív előtagot)
