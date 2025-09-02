import { FrameLocator, Page } from "@playwright/test";
import { CanvasClickHelper } from "../utils/CanvasClickHelper";
import { CalculatorButton } from "../utils/types";
import Tesseract from "tesseract.js";
import { buildButtonMap } from "../utils/CalculatorButtonMap";

export class CalculatorPage {
	private clickHelper!: CanvasClickHelper<Record<CalculatorButton, { x: number; y: number }>>;
	private frame: FrameLocator;
	private browserName: string;

	constructor(private page: Page) {
		this.frame = this.page.frameLocator("#fullframe");
		this.browserName = (this.page.context() as any)._browser?._name || "chromium";
	}

	private async adjustForWebkit(box: { x: number; y: number; width: number; height: number }) {
		if (this.browserName !== "webkit") return box;

		const dpr = await this.page.evaluate(() => window.devicePixelRatio);
		return {
			x: box.x,
			y: box.y,
			width: box.width / dpr,
			height: box.height / dpr,
		};
	}

	private async initClickHelper() {
		const boundingBox = await this.frame.locator("canvas").boundingBox();
		if (!boundingBox) throw new Error("Canvas not found");

		const adjusted = await this.adjustForWebkit(boundingBox);
		const map = buildButtonMap(adjusted.width, adjusted.height);
		this.clickHelper = new CanvasClickHelper(this.page, map);
	}

	async goto(url: string) {
		await this.page.goto(url);
		await this.frame.locator("canvas").waitFor();
		await this.initClickHelper();
	}

	private async getCanvasCenter() {
		const boundingBox = await this.frame.locator("canvas").boundingBox();
		if (!boundingBox) throw new Error("Canvas not found inside iframe");
		
		//console.log(`Center: ${JSON.stringify(boundingBox.y + boundingBox.height / 2)}`); // debug
		const adjusted = await this.adjustForWebkit(boundingBox);

		return {
			x: adjusted.x + adjusted.width / 2,
			y: adjusted.y + adjusted.height / 2 + (adjusted.height * 0.1),
		};
	}

	async pressNumber(num: number) {
		const digits = num.toString().split("") as CalculatorButton[];
		const center = await this.getCanvasCenter();
		for (const d of digits) {
		await this.clickHelper.clickButton(d, center);
		}
	}

	async pressOperation(op: "+" | "-" | "*" | "/") {
		const center = await this.getCanvasCenter();
		await this.clickHelper.clickButton(op, center);
	}

	async pressEquals() {
		const center = await this.getCanvasCenter();
		await this.clickHelper.clickButton("=", center);
	}

	async getResult(): Promise<number> {
		const canvasHandle = await this.frame.locator("canvas").elementHandle();
		if (!canvasHandle) throw new Error("Canvas not found");

		const screenshotBuffer = await canvasHandle.screenshot();

		const sharp = require("sharp");
		const box = await canvasHandle.boundingBox();
		if (!box) throw new Error("Canvas boundingBox not found");

		const isWebKit = this.browserName === "webkit";

		const left = Math.floor(10);
		const top = Math.floor(10);
		const width = Math.floor(box.width - 20);
		const height = Math.floor(box.height * 0.15);

		const image = sharp(screenshotBuffer);
		const metadata = await image.metadata();

		const processed = await image
			.extract({
				left: isWebKit && metadata.width ? Math.floor(left * (metadata.width / box.width)) : left,
				top: isWebKit && metadata.height ? Math.floor(top * (metadata.height / box.height)) : top,
				width: isWebKit && metadata.width ? Math.floor(width * (metadata.width / box.width)) : width,
				height: isWebKit && metadata.height ? Math.floor(height * (metadata.height / box.height)) : height,
			})
			.grayscale()
			.threshold(150)
			.toBuffer();


		const { data: { text } } = await Tesseract.recognize(processed, "eng", {
			logger: (m: any) => process.env.DEBUG_CANVAS === "true" && console.log(m),
		} as any);
		const cleaned = text.replace(/\s+/g, "");

		if (process.env.DEBUG_CANVAS === "true") {
			await require("fs").promises.writeFile("ocr_debug.png", processed);
			console.log("OCR raw text:", text);
		}

		const match = cleaned.match(/[\d.]+/);
		if (!match) throw new Error(`OCR failed: ${text}`);
		return parseFloat(match[0]);
	}
}
