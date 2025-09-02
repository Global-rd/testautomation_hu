# OOP + TypeScript Canvas Calculator Tesztelés

Ez a projekt egy **OOP alapú automatizált tesztet** valósít meg egy canvas alapú online számológéphez. A számológép UI-ja canvas elemekből áll, így a gombnyomásokat koordináták alapján kell kezelni.

## Tesztelendő rendszer
- **URL:** [https://www.online-calculator.com/full-screen-calculator/](https://www.online-calculator.com/full-screen-calculator/)
- A számológép **nem DOM elemekből** épül fel, hanem canvas-on rajzolja a felületet.
- Teszteléshez koordinátákon alapuló kattintások és OCR szükséges az eredmények olvasásához.

## Projekt struktúra

```
src/
├─ pages/
│  └─ CalculatorPage.ts       # Page Object osztály a canvas interakcióhoz
├─ services/
│  └─ CalculatorService.ts    # Service réteg a tesztadatok kezeléséhez és műveletek végrehajtásához
├─ utils/
│  └─ CanvasClickHelper.ts    # Generikus segédosztály a canvas gombnyomásokhoz
├─ tests/
│  └─ calculator.spec.ts         # Tesztesetek Playwright/Cypress segítségével
.env                          # Tesztadatok konfigurációja
```


## Telepítés és futtatás

1. Klónozd a repository-t:

```bash
git clone <repo-url>
cd <repo-folder>
```

2. Telepítsd a függőségeket:

```bash
npm install
```

3. Futtasd a teszteket:


```bash
npx playwright test
```

