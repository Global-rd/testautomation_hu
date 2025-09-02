import { Page } from "@playwright/test";

export class CanvasClickHelper<T extends Record<string, { x: number; y: number }>> {
	constructor(private page: Page, private buttonMap: T) {}

	async clickButton(button: keyof T, canvasCenter: { x: number; y: number }) {
		const coords = this.buttonMap[button];
		if (!coords) throw new Error(`Invalid button: ${String(button)}`);

		const clickX = canvasCenter.x + coords.x;
		const clickY = canvasCenter.y + coords.y;

		if (process.env.DEBUG_CANVAS === "true") {
			await this.highlightClick(clickX, clickY, String(button));
		}

		await this.page.mouse.click(clickX, clickY);
	}

	private async highlightClick(x: number, y: number, label: string) { //devnote: just for debugging purposes only
		await this.page.evaluate(
		([x, y, label]) => {
			x = Number(x);
			y = Number(y);
			const marker = document.createElement("div");
			marker.style.position = "absolute";
			marker.style.left = `${x - 10}px`;
			marker.style.top = `${y - 10}px`;
			marker.style.width = "20px";
			marker.style.height = "20px";
			marker.style.border = "2px solid red";
			marker.style.borderRadius = "50%";
			marker.style.zIndex = "9999";
			marker.style.background = "rgba(255,0,0,0.2)";
			marker.style.pointerEvents = "none";

			const text = document.createElement("span");
			text.textContent = String(label);
			text.style.position = "absolute";
			text.style.left = `${x + 15}px`;
			text.style.top = `${y - 10}px`;
			text.style.fontSize = "14px";
			text.style.color = "red";
			text.style.fontWeight = "bold";

			document.body.appendChild(marker);
			document.body.appendChild(text);

			setTimeout(() => {
			marker.remove();
			text.remove();
			}, 1500);
		},
		[x, y, label]
		);
	}
}
