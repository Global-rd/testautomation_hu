import { test, expect } from "@playwright/test";
import { OCRHelper } from "../support/ocr.helper";
import { CalculatorService } from "support/calculator.service";

test.describe("Calculator Tests", () => {
  let ocr: OCRHelper | null = null;

  test.beforeAll(async () => {
    ocr = new OCRHelper();
    await ocr.initialize();
  });

  test.afterAll(async () => {
    await ocr?.terminate();
  });

  test("should add two numbers", async ({ page }) => {
    const service = new CalculatorService(page);
    await service.init();
    const config = service.getConfig();

    await service.add(config.num1, config.num2);

    const screenshot = await service.getResult();
    const result = await ocr?.extractNumber(screenshot);

    expect(result).toBe(config.add_result);
  });

  test("should subtract two numbers", async ({ page }) => {
    const service = new CalculatorService(page);
    await service.init();
    const config = service.getConfig();

    await service.subtract(config.num1, config.num2);

    const screenshot = await service.getResult();
    const result = await ocr?.extractNumber(screenshot);

    expect(result).toBe(config.subtract_result);
  });

  test("should multiply two numbers", async ({ page }) => {
    const service = new CalculatorService(page);
    await service.init();
    const config = service.getConfig();

    await service.multiply(config.num1, config.num2);

    const screenshot = await service.getResult();
    const result = await ocr?.extractNumber(screenshot);

    expect(result).toBe(config.multiply_result);
  });

  test("should divide two numbers", async ({ page }) => {
    const service = new CalculatorService(page);
    await service.init();
    const config = service.getConfig();

    await service.divide(config.num1, config.num2);

    const screenshot = await service.getResult();
    const result = await ocr?.extractNumber(screenshot);

    expect(result).toBe(config.divide_result);
  });
});
