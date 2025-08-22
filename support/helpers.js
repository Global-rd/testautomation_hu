// Constants
export const CANVAS_RENDER_DELAY = 200;
export const TAB_OPEN_DELAY = 1000;

// Helper function to get canvas center position
export const getCanvasCenter = async (page) => {
    const boundingBox = await page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        return canvas?.getBoundingClientRect();
    });

    return {
        x: boundingBox.x + (Number(boundingBox?.width) / 2),
        y: boundingBox.y + (Number(boundingBox?.height) / 2)
    };
};

export const getCanvasSize = async (page) => {
    const canvasSize = await page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        return canvas?.getBoundingClientRect();
    });
    return {
        width: canvasSize.width,
        height: canvasSize.height,
    }
}


// Helper function to click calculator button
export const clickCalculatorButton = async (page, positionX, positionY, canvasSize, digit, keysInstance) => {
    const buttonData = keysInstance.getButtons(canvasSize.width, canvasSize.height, digit);
    const clickX = positionX + (buttonData[0] - canvasSize.width / 2);
    const clickY = positionY + (buttonData[1] - canvasSize.height / 2);
    console.log(`Clicking digit ${digit} at position:`, [clickX, clickY]);
    await page.mouse.click(clickX, clickY);
};

export const clearCalculator = async (page, positionX, positionY, canvasSize, keysInstance) => {
    await clickCalculatorButton(page, positionX, positionY, canvasSize, 'C', keysInstance);
    await page.waitForTimeout(500);
}
