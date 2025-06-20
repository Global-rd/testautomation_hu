## Test Autimation with Cypress

Testing the "https://automationteststore.com" page with some tests.

### Setup and Run:
#### Requirements:

- Node.js
- Git

#### Installation:
```bash
git clone git@github.com:Global-rd/testautomation_hu.git
cd testautomation_hu
npm install
```

#### Run:
GUI:
```bash
npx cypress open
```

Headless (CLI):
```bash
npx cypress run
```
#### Configuration 
_cypress.config.js_
- baseUrl set to the target test page.
- defaultCommandTimeout: 8000 ms – the default timeout set to a higher value because of the slow elements loading time.

_jsconfig.json_
- This setting is necessary so that you don't have to specify the file language for Intellisense on every file.

### Content

| File | Description | TestCase count |
| --- | --- | --- |
| _sortingProducts.cy.js_ | This test file verifies that the alphabetical sorting (A–Z) works correctly for products in the Skincare category on the webshop. | 1 |
| _cartFunctions.cy.js_ | This test file validates the shopping cart functionality by checking product details, quantity, and subtotal calculations after adding two specific items to the cart. | 2 |
| _uiElements.cy.js_ | This test file ensures that the main page displays exactly 7 product categories in the category menu, excluding the home link. | 1 |
| _registration.cy.js_ | This test file verifies the registration form's validation logic, including required fields, email format, password rules, and password confirmation behavior. | 4 |
| _guestCheckoutFlow.cy.js_ | This test file performs an end-to-end scenario of guest checkout, validating product search, review visibility, cart interaction, form validations, and final invoice correctness after placing an order. | 1 |


