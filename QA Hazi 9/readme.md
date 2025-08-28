# Canvas Calculator E2E Tests

This project contains Playwright + TypeScript tests for a canvas-based calculator.

## Installation

Clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd <your-repo-folder>
npm install
npx playwright install
```

## Environment variables

Create a `.env` file in the project root with the following values:

```ini
CALCULATOR_URL=https://www.online-calculator.com/html5/simple/index.php?v=10
NUMBER1=12
NUMBER2=3
OP=*
```

- `NUMBER1` and `NUMBER2` are the operands.
- `OP` can be one of `+`, `-`, `*`, `/`.

## Running tests

Run all tests:

```bash
npx playwright test
```

Run with debug mode:

```bash
npx playwright test --debug
```

Run on a specific browser:

```bash
npx playwright test --project=webkit
```
