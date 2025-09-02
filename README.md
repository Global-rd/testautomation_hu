# Playwright calculator tests

This project contains automated tests for an online calculator that is built on a canvas. The tests use Playwright and JavaScript to perform arithmetic operations and validate the results using OCR (Optical Character Recognition).

### Prerequisites

Before you can run the tests, you need to have `Node.js` installed.

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

The tests automate a calculator on a canvas, which means they can't use standard locators. Instead, they interact with the page by simulating mouse clicks at specific coordinates.

- **Page Interaction**: The `CanvasCalculator` class handles all key interactions. It navigates to the calculator page and manages the iframe that contains the canvas.

- **Clicks and Operations**: The `CanvasCalculator` uses predefined coordinates to click on numbers and operation symbols to perform calculations.

- **Validation with OCR**: After a calculation, a screenshot of the result display is taken. The `OCRHelper` then reads the number from the image and validates it against the expected result from your `.env` file.

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
- **View the HTML report**:
  ```bash
   npx playwright show-report
  ```

## Troubleshooting

1. **Timeout Errors**

   If a test fails with a **TimeoutError**, it's because the page or an action took too long. This is common in WebKit (Safari).

   - **Adjust Timeout Settings**: Increase the timeout in your `playwright.config.js` file for the WebKit project. A higher value (e.g., `60000`) gives the browser more time to load.

2. **OCR reads the wrong number**

   This happens when the OCR library misinterprets the result on the screen.

   - **Check Debug Images**: Examine the `debug.png` and `debug2.png` files in your project's root. They show you exactly what the OCR is "seeing."

   - **Update Preprocessing**: If the images are blurry or incomplete, adjust the `scale` or `contrast` values in `ocr.helper.js` to improve image quality for the OCR.

   - **Fix parsing logic**: Ensure your `extractNumber` function correctly cleans the text before parsing it, removing any extra characters.

3. **Playwright can't find elements**

   This error means the test couldn't find the button it was supposed to click.

   - **Add Wait Times**: Use await this.page.waitForTimeout(...) to give the page more time to render.

   - **Verify Coordinates**: If the calculator's layout changes, the button positions in calculator.js might be incorrect.

   - **Use a Fixed Viewport**: For reliable results across different screen sizes, set a fixed viewport in playwright.config.js.
