import { Jimp, JimpMime } from "jimp";
import { createWorker, OEM, PSM } from "tesseract.js";

export class OCRHelper {
  private worker?: Tesseract.Worker;

  async initialize() {
    // We use combine OCR engine
    this.worker = await createWorker("eng", OEM.TESSERACT_LSTM_COMBINED);
    await this.worker.setParameters({
      tessedit_char_whitelist: "0123456789.",
      // We use single word mode for best result
      tessedit_pageseg_mode: PSM.SINGLE_WORD,
    });
  }

  async terminate() {
    // Stop worker when finished
    if (this.worker) {
      await this.worker.terminate();
    }
  }

  async preprocess(buffer: Buffer) {
    // Preprocess image to make it more readable for OCR
    const img = await Jimp.read(buffer);
    img.greyscale().contrast(1).autocrop({ cropSymmetric: true }).scale(3);
    // Save as image for debugging
    await img.write(`./debug2.png`);
    return await img.getBuffer(JimpMime.png);
  }

  async extractText(imageBuffer: Buffer) {
    const clean = await this.preprocess(imageBuffer);
    if (!this.worker) {
      throw new Error("Worker not found.");
    }
    const { data } = await this.worker.recognize(clean);
    return data.text.trim();
  }

  async extractNumber(imageBuffer: Buffer | null = null) {
    // Get a number from image, by parsing its result to a single number
    if (!imageBuffer) {
      throw new Error("Image buffer is empty");
    }
    const ocrText = await this.extractText(imageBuffer);
    if (!ocrText) {
      const img = await Jimp.read(imageBuffer);
      // Save as image for debugging
      await img.write(`./error.png`);
      throw new Error("OCR text not found.");
    }
    const numbers = ocrText.match(/[\d.]+/g);
    if (numbers && numbers.length > 0) {
      return parseInt(numbers[numbers.length - 1]);
    }
    throw new Error(`No number found in: "${ocrText}"`);
  }
}
