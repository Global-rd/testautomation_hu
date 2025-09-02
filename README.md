#Canvas alapú kalkulátor ellenőrzése
Playwright és typescript teszttel történik

##Telepítés!
Repo klónozása
npm install 
npx playwright install
npx dotenv install 

##Környezeti változók! 
Készits egy .env file-t a projekt gyökérmappájába. 

Calculator_url: https://www.online-calculator.com/html5/simple/index.php?v=10
NUMBER1 NUMBER2 számok
OP= '+','-',"*","/" lehetnek

##Tesztek futtatása:
Összes teszt futtatása 
npx playwright test
Specifikus kliensen történő futtatása
npx playwright test --project=chromium
UI felület megjelenítése: 
npx playwright test --ui
Riport mutatása: 
npx playwright show-report 

