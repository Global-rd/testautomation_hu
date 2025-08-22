import { displayPosition, keyboardLabel, centerOfButton } from '../utils/coords.js';
import fs from 'node:fs';

export class canvasCalculator {
  constructor(page) {
    
    this.page = page;
    this.frame = this.page.frameLocator('#fullframe')

   }

  canvas() { 
    return this.frame.locator('#canvas')
  }

  async waitReady() {

    await this.page.waitForLoadState('domcontentloaded');
    const canvasLocator = this.canvas();
    await canvasLocator.waitFor({ state: 'visible' });

    const canvasHandle = await canvasLocator.elementHandle();
    if (!canvasHandle) throw new Error('Canvas element not found');

    const box = await canvasHandle.boundingBox()
    if (box) {
      // kezdő overlay/dlg bezárása
      await this.page.mouse.click(
        box.x + box.width / 2,
        box.y + box.height / 2
      );
    }
  }

  async getCanvasBox() {
    const handle = await this.canvas().elementHandle();
    if (!handle) throw new Error('Canvas element nem található');

    const box = await handle.boundingBox();
    if (!box) throw new error ('Canvas boundingBox nem elérhető')
    return box;
  }

  async clickKey(label) {
    const box = await this.getCanvasBox();
    const r = keyboardLabel(box, label);
    const p = centerOfButton(r);

    console.log(`Clicking '${label}' at x=${p.x}, y=${p.y}`);

    await this.page.evaluate(({x, y}) => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    }, { x: p.x, y: p.y });

    //await this.page.screenshot({ path: `debug_click_${label}.png` });

    await this.page.mouse.move(p.x, p.y);
    await this.page.mouse.down();
    await this.page.mouse.up();
    await this.page.waitForTimeout(80);
  }

  async typeNumber(n) {
    for (const ch of String(n).split('')) {
      await this.clickKey(ch);
    }
  }

  async clickOp(op) {
    if (!['+','-','*','/','='].includes(op)) {
      throw new Error(`Nem támogatott operátor: ${op}`);
    }
    await this.clickKey(op);
  }

  async screenshotDisplay(outPath) {
    const box = await this.getCanvasBox();
    const d = displayPosition(box);
    await this.page.screenshot({
      clip: { x: d.x, y: d.y, width: d.width, height: d.height },
      path: outPath
    });
    if (!fs.existsSync(outPath)) throw new Error('Screenshot fájl nem jött létre');
    return outPath;
  }
}