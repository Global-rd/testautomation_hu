# testautomation_hu
## 19. alkalom
    GraphQL - npm install: @apollo/server, express
    In memory Rest mock install: express-openapi-validator, ymljs, express
    Kafka: npm i kafkajs, express. 
     install docker a host gepre, futtatni, majd 'docker compose up' a mappaban ahol a docker-compose megtalalhato. Ha fut a service dockerben, akkor inditani a kafka-mock.js-t (node kafka-mock.js parancs) 

##22. alkalom - Github Actions
    workflows/playwright.yml -> push trigger


Házi feladat – OOP + TypeScript a Canvas tesztelésben
Tesztelendő rendszer
Egy canvas alapon működő számológép:
🔗 https://www.online-calculator.com/full-screen-calculator/
A számológép nem DOM alapú elemekből épül fel, hanem egy canvas elembe rajzolja az
egész UI-t, így a gombnyomásokat koordinátákon keresztül kell megoldani.

Feladatok
1. OOP – Page Object és Service réteg kialakítása
● TypeScript nyelven hozz létre egy CalculatorPage osztályt, amely:
○ Metódust tartalmaz szám bevitelére: pressNumber(num: number)
○ Metódust tartalmaz művelet kiválasztására: pressOperation(op: '+' | '-' | '*' | '/')
○ Metódust tartalmaz az eredmény lekérésére OCR segítségével: getResult():
Promise<number>

● Hozz létre egy CalculatorService osztályt, amely:
○ Betölti a tesztadatokat .env-ből vagy fixture-ből
○ Meghívja a CalculatorPage metódusait egy adott művelet végrehajtásához
○ Visszaadja az eredményt ellenőrzésre a tesztnek

2. TypeScript – Generikus segédosztály a Canvas interakcióhoz
● Készíts egy CanvasClickHelper<T> generikus osztályt vagy függvényt, amely:
○ T típusként kapja meg a gombok koordináta-térképét (Record<string, { x:
number; y: number }>).
○ Biztosítja, hogy csak a típusban definiált gombnevekre lehessen kattintani.

● Használd ezt a CalculatorPage osztályban, hogy a gombnyomások típusbiztosak
legyenek.

Technológiai megkötések
● Tesztkeretrendszer: Playwright vagy Cypress
● Nyelv: TypeScript
● OCR könyvtár: Szabadon választható, működő OCR megoldás kötelező

Beadás módja
1. Új branch létrehozása a GitHub repositoryban
2. Tesztkód, Page Object osztályok, utility modulok és konfigurációk feltöltése
3. Branch link beküldése Classroomban