# Playwright Canvas Calculator Test 🧪

This project contains an automated test suite for an online calculator that is built on a HTML Canvas element. The tests are written using Playwright and Tesseract.js to interact with the canvas via coordinates and validate the results using Optical Character Recognition (OCR).

## 🚀 Getting Started

Follow these steps to set up and run the test suite on your local machine.

### Prerequisites

You'll need **Node.js** and **npm** (or another package manager like yarn or pnpm) installed.

### Installation

    Clone this repository to your local machine.

    Navigate to the project directory in your terminal.

    Install the project dependencies, including Playwright and Tesseract.js.

    ```bash
    npm install
    ```

### Configuration

This project uses a `.env` file to store the base URL of the calculator website, making it easy to test different environments without changing the code.

    Create a file named `.env` in the root of the project.

    Add the calculator URL to the file as follows:

    ```ini
    BASE_URL=https://www.online-calculator.com/html5/simple/index.php?v=10
    ```

---

## ▶️ Running the Tests

Once the installation and configuration are complete, you can run the tests from your terminal.

To run the tests in headless mode (the default):

```bash
npm run test
```

To run the tests with the browser visible:

```bash
npm run test:headed
```

To view the HTML report after a test run:

```bash
npm run report
```

---

## ⚙️ Updating Test Data

The test suite uses a parameterized approach, reading test cases from `fixtures/test-calculations.js`. To add, remove, or modify the calculations to be tested, you only need to edit this file.

The `calculatorData` array contains objects, where `calc` is the operation string and `result` is the expected outcome.

**fixtures/test-calculations.js**
```javascript
const calculatorData = [
// Add or modify your test cases here
{ calc: '44+11', result: '55' },
{ calc: '4+4', result: '8' },
{ calc: '44-1', result: '43' },
{ calc: '4*5', result: '20' },
{ calc: '60/6', result: '10' },
{ calc: '6+300', result: '306' },
{ calc: '6+300C', result: '0' }, // Example of a clear operation
];

module.exports = { calculatorData };
```