# Playwright & Tesseract.js Calculator Test Automation

---

## Description

This project provides an end-to-end test automation solution for the full-screen calculator application at `https://www.online-calculator.com/full-screen-calculator/`. The test suite is built using **Playwright** and **TypeScript**, leveraging **Tesseract.js** for optical character recognition (OCR) to read the calculator's display.

The solution is designed with a strong focus on clean architecture and best practices, including:
* **Page Object Model (POM):** UI interactions are encapsulated in a `CalculatorPage` class.
* **Service Layer:** Business logic and helper functions (e.g., ad-blocking, button mapping, OCR) are separated into dedicated service classes.
* **Data-Driven Testing:** Test data is loaded from a JSON fixture, allowing for easy expansion of test cases.
* **Generic Typing:** A generic helper class ensures type-safe interactions with the application's canvas.

---

## Prerequisites

* **Node.js:** Ensure you have Node.js installed on your system.
* **npm:** The Node Package Manager is used to manage project dependencies.

---

## Installation

1. Clone the repository.
2. Navigate to the project's root directory.
3. Install all required dependencies by running the following command:

    ```bash
    npm install
    ```

---

## Running the Tests

Tests are executed using the Playwright Test runner. The following commands are available:

* **Run all tests:**
    ```bash
    npm test
    ```
* **Run tests in a headed browser (to see the actions):**
    ```bash
    npm run test:headed
    ```
* **Run tests with the UI mode (for debugging):**
    ```bash
    npm run test:ui
    ```
* **Run tests with debug mode:**
    ```bash
    npm run test:debug
    ```
* **Show the test report (after running tests):**
    ```bash
    npm run report
    ```
---

## Core Technologies

* **Playwright:** A powerful tool for end-to-end web testing.
* **TypeScript:** The programming language used for the entire project.
* **Tesseract.js:** An OCR library used to read text from images.
* **Jimp:** An image processing library for Node.js, used to preprocess images for OCR.
* **math.js:** A library to programmatically evaluate mathematical expressions from strings.