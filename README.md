# testautomation_hu

A projekt futtatásához szükséged lesz a [Node.js][nodejs] telepítésére.
Javasolt ehhez az [Node Version Manager (nvm)][nvm-inst] használata.
Az alap telepítés az `nvm install node` paranccsal történik.
Ezzel a legújabb verzió települ, és rögtön kiválasztásra is kerül.
A terminált lehet, hogy újra kell indítani, hogy érvénybe lépjen a változások.

A Git repository klónozása után, futtassd le az alábbi parancsot a node modulok
letöltéséhez:

```shell
npm install
```

Ezek után elérhető lessz a Cypress, és az alábbi paranccsok egyikével
lehet interaktívan használni:

```shell
npx cypress open
npm run cy:open
```

## Cypress konfiguráció ##

A konfigurációs fájl a generált konfigurációf fájl kiegészítésével történt.
A `baseUrl` a `https://automationteststore.com/` beállítást tartalmazza,
hogy a host nevének kiírását ne kelljen minden látogatáskor újra kiírni,
valamint beállítsa a tesztelendő domain-t. Az URL útvonala azért a
gyökértől (`/`) kezdődik, mert a tesztek, a tesztektől függően más és más
oldalakat látogatnak meg.
A `defaultCommandTimeout` beállítás meg 8 másodpercre van beállítva,
hogy lassabb kapcsolaton, illetve gépeken is biztosan betöltse
az elemeket az oldalon.

## Teszt fájlok ##

- **homework.cy.js**
  tartalmaz közvetlenebb felhasználói élményt ellenőrző teszteket.
- **guestCheckoutFlow.cy.js**
  tartalmazza a fizetés tesztet, ezen belül is vendégként (felhasználó nélkül)
  való fizetést.

[nodejs]: https://nodejs.org/
[nvm-inst]: https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating
