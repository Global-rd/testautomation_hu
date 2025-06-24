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

[nodejs]: https://nodejs.org/
[nvm-inst]: https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating
