const { test, expect } = require("@playwright/test");
const CanvasCalculator = require("../support/calculator");
const OCRHelper = require("../support/ocr.helper");
const fs = require("fs");
require("dotenv").config();

// Load config from .env
function getConfig() {
  return {
    num1: Number(process.env.FIRST_NUMBER),
    num2: Number(process.env.SECOND_NUMBER),
    add_result: Number(process.env.ADD_RESULT),
    subtract_result: Number(process.env.SUBTRACT_RESULT),
    multiply_result: Number(process.env.MULTIPLY_RESULT),
    divide_result: Number(process.env.DIVIDE_RESULT),
  };
}

test.describe("Calculator Tests", () => {
  let ocr;

  test.beforeAll(async () => {
    ocr = new OCRHelper();
    await ocr.initialize();
  });

  test.afterAll(async () => {
    await ocr.terminate();
  });

  test("should add two numbers", async ({ page }) => {
    const config = getConfig();

    const calc = new CanvasCalculator(page);
    await calc.init();
    await calc.calculate(config.num1, config.num2, "+");

    const screenshot = await calc.getResult();
    const text = await ocr.extractText(screenshot);
    const result = OCRHelper.extractNumber(text);

    expect(result).toBe(config.add_result);
  });

  test("should subtract two numbers", async ({ page }) => {
    const config = getConfig();

    const calc = new CanvasCalculator(page);
    await calc.init();
    await calc.calculate(config.num1, config.num2, "-");

    const screenshot = await calc.getResult();
    const text = await ocr.extractText(screenshot);
    const result = OCRHelper.extractNumber(text);

    expect(result).toBe(config.subtract_result);
  });

  test("should multiply two numbers", async ({ page }) => {
    const calc = new CanvasCalculator(page);
    const config = getConfig();

    await calc.init();
    await calc.calculate(config.num1, config.num2, "*");

    const screenshot = await calc.getResult();
    const text = await ocr.extractText(screenshot);
    const result = OCRHelper.extractNumber(text);

    expect(result).toBe(config.multiply_result);
  });

  test("should divide two numbers", async ({ page }) => {
    const calc = new CanvasCalculator(page);
    const config = getConfig();

    await calc.init();
    await calc.calculate(config.num1, config.num2, "/");

    const screenshot = await calc.getResult();
    const text = await ocr.extractText(screenshot);
    const result = OCRHelper.extractNumber(text);

    expect(result).toBe(config.divide_result);
  });
});
