export const CALCULATOR_URL = "https://www.online-calculator.com//html5/simple/index.php?v=10";
export const CANVAS_RENDER_DELAY = 200;
export const TAB_OPEN_DELAY = 1000;

export const getCanvasCenter = async (page) => {
	const boundingBox = await page.evaluate(() => {
		const canvas = document.querySelector("canvas");
		return canvas?.getBoundingClientRect();
	});

	return {
		x: boundingBox.x + Number(boundingBox?.width) / 2,
		y: boundingBox.y + Number(boundingBox?.height) / 2,
	};
};
