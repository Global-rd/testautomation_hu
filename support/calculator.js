class CanvasCalculator {
  constructor(page) {
    this.page = page;
    this.frame = null;
    this.canvasSize = null;
    this.buttons = null;
  }

  async init() {
    await this.page.goto(
      "https://www.online-calculator.com/full-screen-calculator/",
      { timeout: 20000 }
    );

    // Hide GDPR banner with CSS
    await this.page.addStyleTag({
      content: ".qc-cmp2-container { display: none !important; }",
    });

    // Get the iframe
    await this.page.waitForSelector("#fullframe", { timeout: 10000 });
    this.frame = this.page.frameLocator("#fullframe").first();

    // Wait for canvas inside iframe
    await this.frame.locator("canvas").waitFor({ timeout: 10000 });
    await this.page.waitForTimeout(1000);

    // Get canvas size
    const canvas = this.frame.locator("canvas").first();
    const box = await canvas.boundingBox();
    this.canvasSize = {
      width: box.width,
      height: box.height,
      x: box.x,
      y: box.y,
    };

    // Helper function to calculate button position
    const buttonPos = (col, row) => {
      const w = this.canvasSize.width;
      const h = this.canvasSize.height * 0.8;
      const mt = this.canvasSize.height * 0.2;
      const bw = w / 5;
      const bh = h / 5;

      return {
        x: bw * col + bw / 2,
        y: mt + bh * row + bh / 2,
      };
    };

    // Define buttons using grid positions
    this.buttons = {
      C: buttonPos(4, 0),
      7: buttonPos(0, 1),
      8: buttonPos(1, 1),
      9: buttonPos(2, 1),
      4: buttonPos(0, 2),
      5: buttonPos(1, 2),
      6: buttonPos(2, 2),
      1: buttonPos(0, 3),
      2: buttonPos(1, 3),
      3: buttonPos(2, 3),
      0: buttonPos(0, 4),
      "+": buttonPos(3, 4),
      "-": buttonPos(3, 3),
      "*": buttonPos(3, 2),
      "/": buttonPos(3, 1),
      "=": buttonPos(4, 4),
    };
  }

  async clickButton(button) {
    const pos = this.buttons[button];
    const canvas = this.frame.locator("canvas").first();
    await canvas.click({ position: { x: pos.x, y: pos.y } });
    await this.page.waitForTimeout(300);
  }

  async calculate(num1, num2, operator) {
    await this.clickButton("C");

    // Input first number
    for (const digit of num1.toString()) {
      await this.clickButton(digit);
    }

    await this.page.waitForTimeout(500);

    await this.clickButton(operator);

    await this.page.waitForTimeout(500);

    // Input second number
    for (const digit of num2.toString()) {
      await this.clickButton(digit);
    }

    await this.page.waitForTimeout(500);

    await this.clickButton("=");

    await this.page.waitForTimeout(1000);
  }

  async getResult() {
    const width = this.canvasSize.width;
    const height = this.canvasSize.height * 0.2;
    const border = height * 0.15;
    return await this.page.screenshot({
      path: "./debug.png",
      clip: {
        x: this.canvasSize.x + border,
        y: this.canvasSize.y + border,
        width: width - border * 2,
        height: height - border * 2,
      },
    });
  }
}

module.exports = CanvasCalculator;
