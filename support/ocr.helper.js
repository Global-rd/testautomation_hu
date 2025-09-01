const { Jimp, JimpMime } = require("jimp");
const { createWorker, OEM } = require("tesseract.js");

class OCRHelper {
  constructor() {
    this.worker = null;
  }

  async initialize() {
    this.worker = await createWorker("eng", OEM.TESSERACT_LSTM_COMBINED);
    await this.worker.setParameters({
      tessedit_char_whitelist: "0123456789.",
      tessedit_pageseg_mode: "8",
    });
  }

  async extractText(imageBuffer) {
    const clean = await this.preprocess(imageBuffer);
    const { data } = await this.worker.recognize(clean, "eng");
    return data.text.trim();
  }

  async terminate() {
    if (this.worker) {
      await this.worker.terminate();
    }
  }

  async preprocess(buffer) {
    const img = await Jimp.read(buffer);
    img.greyscale().contrast(1).autocrop({ cropSymmetric: true }).scale(3);
    await img.write(`./debug2.png`);
    return await img.getBuffer(JimpMime.png);
  }

  static extractNumber(ocrText) {
    const numbers = ocrText.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      return parseInt(numbers[numbers.length - 1]);
    }
    throw new Error(`No number found in: "${ocrText}"`);
  }
}

module.exports = OCRHelper;
