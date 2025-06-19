# testautomation_hu
1. Környezeti követelmények telepítése és futtatása:
Node.js@latest
npm@latest
Cypress@latest

Telepítés és futtatás:
npm install
node install
npm install cypress --save-dev
npx cypress open

2. Cypress Config Rövid Indoklás
Az alábbi Cypress konfigurációs fájl testreszabása a következő célokat szolgálja:
baseUrl: Beállítja az alapértelmezett URL-t, amelyre a tesztek hivatkoznak. Ez segít abban, hogy a tesztek mindig a megfelelő weboldalon futtassanak, és ne kelljen minden egyes tesztben külön megadni az URL-t.

defaultCommandTimeout: Meghatározza az alapértelmezett időtúllépést (milliszekundumban) a Cypress parancsokhoz. Ez a beállítás segít elkerülni a tesztek idő előtti sikertelenségét, különösen akkor, ha az oldal betöltése hosszabb időt vesz igénybe.

specPattern: Meghatározza a tesztfájlok mintázatát, amelyeket a Cypress futtatni fog. Ez a beállítás lehetővé teszi, hogy a Cypress csak a megadott mappában és fájltípusokban keressen tesztfájlokat.

setupNodeEvents: Ez a funkció lehetővé teszi a Node.js események kezelését a Cypress konfigurációban. Itt implementálhatók különböző eseményfigyelők, amelyek segíthetnek a tesztelési folyamat testreszabásában és optimalizálásában.

Ez a konfiguráció biztosítja, hogy a Cypress tesztek megbízhatóan és hatékonyan fussanak, figyelembe véve az oldal betöltési idejét és a tesztfájlok elhelyezkedését.

3.Tesztfájlok listája és tartalma 1-2 mondatban:
- Automatedtest.cy.js: 
UI tesztek az alábbi oldalhoz: https://automationteststore.com

2 Terméklista rendezés
tesztje

Nyiss meg egy kategóriát (pl. Skin Care), és
teszteld, hogy az “A-Z” rendezés megfelelően
működik. Ellenőrizd, hogy az első három termék
tényleg ABC sorrendben van.

3 pont

3 Kosár funkciók
tesztelése

Tegyél 2 különböző terméket a kosárba, majd
ellenőrizd a megjelenített termékneveket, árakat
és darabszámot a kosár oldalon.Számítsd ki
“kézzel’ a várt összeget, és hasonlítsd össze a
kosárban szereplő Sub-Total értékkel.

4 pont

4 Termék kategóriák A product ownerünk szeretné tudni hogy jelenleg
biztosan 7 termék kategóriánk van-e az oldalon

2 pont

5 Regisztrációs űrlap
hibakezelése

Töltsd ki a regisztrációs űrlapot hibás adatokkal
(pl. üres mezők, érvénytelen email), és ellenőrizd,
hogy megjelennek-e a hibaüzenetek. Legalább 3
különböző validációs hiba esetet fedj le.

4 pont

-questshopping,cy.js: 

Önálló end-to-end
(E2E) teszt: Vásárlás
vendégként +
hibaellenőrzés

● Keresés funkció használata: keress egy termékre (pl. “shampoo”)
● Termék kiválasztása és részletező oldal ellenőrzése. Kiváncsiak vagyunk hogy a
review oldal rendesen működik-e, egyik termékhez létezik korábbi review.
Ellenőrizzük.
● Termék kosárba helyezése
● Tovább a kosár oldalra → Checkout gomb
● Próbálj fizetni vendégként bejelentkezés nélkül
● Ellenőrizd, hogy a rendeléshez szükség van rendelői adatok megadására. Rendeld
meg a terméke(ke)t és ellenőrizd hogy az invoice oldalon helyes értékek
szerepelnek.
10 pont

4. Hiba kezelés: 

- spec pattern hiba esetén alkalmazd az alábbi lépéseket: 
4.1. npx cypress cache clear

4.2. rmdir /s /q node_modules
del package-lock.json

4.3. npm cache clean --force

4.4. Nézz körül és töröld a mappákat:
C:\Users<username>\AppData\Local\Cypress

4.5. Windows esetén a törlések után és az újra telepítés előtt RESTART!