import { expect, test } from "@playwright/test";
import { CalculatorPage } from "../pages/CalculatorPage";
import Tesseract from "tesseract.js";
require("dotenv").config();

test("canvas calculator operation", async ({ page, browserName }) => {
	const calculator = new CalculatorPage(page, browserName);

	await calculator.goto(process.env.CALCULATOR_URL);

	const { x: positionX, y: positionY } = await calculator.getCanvasCenter();
	const canvasSize = await calculator.getCanvasSize();

	const inputDigit1 = parseInt(process.env.NUMBER1, 10);
	const inputDigit2 = parseInt(process.env.NUMBER2, 10);
	const operation = process.env.OPERATION || "adds";

	let expectedNumber;
	switch (operation) {
		case "adds": expectedNumber = inputDigit1 + inputDigit2; break;
		case "subs": expectedNumber = inputDigit1 - inputDigit2; break;
		case "multi": expectedNumber = inputDigit1 * inputDigit2; break;
		case "divs": expectedNumber = inputDigit1 / inputDigit2; break;
	}

	await page.waitForTimeout(1000);

	const digits1 = [...inputDigit1.toString()].map(Number);
	const digits2 = [...inputDigit2.toString()].map(Number);
	const inputArray = [...digits1, operation, ...digits2, "eq"];
	console.log(inputArray);

	for (const element of inputArray) {
		await calculator.clickButton(element, positionX, positionY, canvasSize);
		await page.waitForTimeout(1000);
	}

	// OCR with fallback
	const dataURL = await calculator.getOCRText();
	let { data: { text } } = await Tesseract.recognize(dataURL, "eng");

	let ocrMatch = text.match(/\d+/);
	if (!ocrMatch) {
		console.warn(`OCR first attempt failed. Retrying with relaxed config. Raw text: "${text}"`);
		({ data: { text } } = await Tesseract.recognize(dataURL, "eng", { tessedit_pageseg_mode: "6" }));
		ocrMatch = text.match(/\d+/);
	}

	if (!ocrMatch) {
		throw new Error(`OCR failed to detect number after retry. Raw text: "${text}"`);
	}

	const ocrNumber = parseInt(ocrMatch[0], 10);
	expect(ocrNumber).toBe(expectedNumber);
});
