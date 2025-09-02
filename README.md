# Playwright calculator tests

This project contains automated end-to-end tests for a full-screen online calculator, built using **Playwright**, **TypeScript**, and an **OCR library**. The tests perform basic arithmetic operations (addition, subtraction, multiplication, and division) and validate the results by using Optical Character Recognition (OCR) on the calculator's display.

---

### Prerequisites

Before you can run the tests, you need to have `Node.js` installed.

---

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone <your-repository-url>
   cd <your-project-folder>
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   npx playwright install
   ```
3. Create a `.env` file in the root directory and add the following configuration:
   ```bash
   FIRST_NUMBER=...
   SECOND_NUMBER=...
   ADD_RESULT=...
   SUBTRACT_RESULT=...
   MULTIPLY_RESULT=...
   DIVIDE_RESULT=...
   ```
   Replace the `...` with the numbers you want to test and their expected results.

## How it works

This project performs automated tests on a calculator that is built on a canvas, which means we can't use standard element locators. Instead, the test suite simulates mouse clicks on specific coordinates of the calculator's canvas to perform actions.

1. **Page Interaction**: The `CalculatorPage` class handles the core interactions. It navigates to the calculator page and manages the `iframe` that contains the calculator canvas.

2. **Number and Operation Clicks**: To perform a calculation, the tests use the `CanvasClickHelper` utility. This utility maps each number and operation button to its specific coordinate on the canvas. The `CalculatorPage` uses these coordinates to simulate clicks on the virtual calculator keys.

3. **Result validation with OCR**: After a calculation is performed, a screenshot of the result display area is taken. An OCR (Optical Character Recognition) library then processes this screenshot to read the resulting number and compare it against the expected value defined in the `.env` file.

## Running tests

You can run the tests using the following commands:

- **Run all tests (headless)**:
  ```bash
    npx playwright test
  ```
- **Run tests in a visible browser**:
  ```bash
   npx playwright test --headed
  ```
- **Run tests in UI mode**:
  ```bash
   npx playwright test --ui
  ```
- **Generate and view the HTML report**:
  ```bash
   npx playwright show-report
  ```

## Troubleshooting

1. **Playwright can't find elements**

   This often happens because your test is clicking on the wrong spot. Here’s what you can do:

   - **Adjust Timings**: If your machine or internet is slow, increase the `page.waitForTimeout` values in `calculator.ts`.

   - **Check Coordinates**: If the calculator's layout changes, the button positions you've calculated might be off.

   - **Use Debug Mode**: Run `npm run test:debug` to see exactly where Playwright is clicking.

2. **OCR reads the wrong number**

   If the result doesn't match what's in your .env file, the OCR might be misinterpreting the screenshot.

   - **Check your config**: Make sure the results in your `.env` file are correct.

   - **View the Debug images**: The code saves `debug.png`, `debug2.png` and `error.png`. Look at these files to see what the OCR is "seeing."

   - **Tweak Preprocessing**: In `ocr.helper.ts`, try adjusting values like `contrast` or `scale` to improve the quality of the image for the OCR.
