# testautomation_hu
edit2 

https://automationteststore.com
Cypress config: rövid leiras: baseURL: beallitja az alapertelmezett URL-t, erre hivatkoznak a tesztek. 
defaultCommandTimeout:meghatarozza az alapertelmezett idötullepest a Cypress parancsokhoz. Ez adott esetben segit az oldal betöltesehez lassu internet eseten pl. 

Feladatok, teszttek:
1. Cypress config, baseURL: baseUrl beállítása a cypress.config.js fájlban.
Módosítsd a defaultCommandTimeout értékét is (pl. 8000ms)

2. Terméklista rendezés: Nyiss meg egy kategóriát (pl. Skin Care), és
teszteld, hogy az “A-Z” rendezés megfelelően
működik. Ellenőrizd, hogy az első három termék
tényleg ABC sorrendben van.

3. Kosár funkciók tesztelése: Tegyél 2 különböző terméket a kosárba, majd
ellenőrizd a megjelenített termékneveket, árakat
és darabszámot a kosár oldalon.Számítsd ki
“kézzel’ a várt összeget, és hasonlítsd össze a
kosárban szereplő Sub-Total értékkel.

4. Termék kategóriák: A product ownerünk szeretné tudni hogy jelenleg
biztosan 7 termék kategóriánk van-e az oldalon

5. Regisztrációs űrlap hibakezelése: Töltsd ki a regisztrációs űrlapot hibás adatokkal(pl. üres mezők, érvénytelen email), és ellenőrizd,
hogy megjelennek-e a hibaüzenetek. Legalább 3
különböző validációs hiba esetet fedj le.

6. Önálló end-to-end(E2E) teszt: Vásárlás vendégként + hibaellenőrzés:
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

Ezek a feladatok nalam ket külön fajlban talalhatok, guestcheck.cy.js es vendegfizetes.cy.js, szamomra igy egyszerübb es atlathatobb, jobban elkülönithetöek voltak a tesztek. 
