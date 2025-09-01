// support.js
const { Page } = require('@playwright/test');

export const pixelData = async (page) => {

    return await page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        let x = (canvas?.getBoundingClientRect().width / 2)
        let y = (canvas?.getBoundingClientRect().height / 2)
        // getting color at (x, y) on a single pixel
        return ctx.getImageData(x, y, 1, 1).data;
    });

}

