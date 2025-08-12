import { CALCULATOR_URL, getCanvasCenter } from "../utils/helpers";
import { expect, test } from "@playwright/test";

import Tesseract from "tesseract.js";
import { keys } from "../utils/keys";
require("dotenv").config();

// Helper function to click calculator button
const clickCalculatorButton = async ( page, positionX, positionY, canvasSize, digit ) => {
	const browserName = test.info().project.name;

	// Only adjust canvas size on WebKit
	let adjustedCanvas = { ...canvasSize };
	if (browserName === "webkit") {
		const dpr = await page.evaluate(() => window.devicePixelRatio);
		adjustedCanvas = {
		width: canvasSize.width / dpr,
		height: canvasSize.height / dpr,
		};
	}

	const buttonData = keys.getButtons(
		adjustedCanvas.width,
		adjustedCanvas.height,
		digit
	);

	const clickX = positionX + (buttonData[0] - adjustedCanvas.width / 2);
	const clickY = positionY + (buttonData[1] - adjustedCanvas.height / 2);

	console.log(`Clicking digit ${digit} at position:`, [clickX, clickY]);
	await page.mouse.click(clickX, clickY);
	await page.waitForTimeout(500);
};

test("calculates", async ({ page }) => {
	await page.goto(CALCULATOR_URL);

	const { x: positionX, y: positionY } = await getCanvasCenter(page);
	console.log("Canvas center position:", { positionX, positionY });

	// Get canvas size for button calculations
	const canvasSize = await page.evaluate(() => {
		const canvas = document.querySelector("canvas");
		return { width: canvas.width, height: canvas.height };
	});

	const inputDigit1 = parseInt(process.env.NUMBER1, 10);
	const inputDigit2 = parseInt(process.env.NUMBER2, 10);

	let expectedNumber = inputDigit1 + inputDigit2;
	await page.waitForTimeout(1000);

	const digits1 = [...inputDigit1.toString()].map(Number);
	const digits2 = [...inputDigit2.toString()].map(Number);
	const inputArray = [...digits1, "adds", ...digits2, "eq"];

	console.log(inputArray);
	// Click the buttons in sequence
	for (const element of inputArray) {
		await clickCalculatorButton( page, positionX, positionY, canvasSize, element );
		await page.waitForTimeout(1000); // Optional delay between clicks
	}
	// Perform OCR on canvas
	const dataURL = await keys.readOCR(page);

	const {data: { text } } = await Tesseract.recognize(dataURL, "eng", {
		tessedit_char_whitelist: "0123456789.",
		tessedit_pageseg_mode: "7",
	});

	console.log("OCR Result:", text);

	// Extract first number from OCR result
	const lines = text.split("\n").filter((line) => line.trim());
	const ocrNumber = lines[0] || text.split("\n")[0];
	console.log("Extracted number:", ocrNumber);
	await page.pause();

	// Verify OCR result matches expected
	expect(Number(ocrNumber)).toBe(expectedNumber);
});
