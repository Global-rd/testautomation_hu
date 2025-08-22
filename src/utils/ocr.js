import Tesseract from 'tesseract.js';
import { createCanvas, loadImage } from 'canvas';
import fs from 'node:fs';

function preprocessPNG(inputPath, outputPath) {
  const img = fs.readFileSync(inputPath);
  return loadImage(img).then((image) => {
    const c = createCanvas(image.width, image.height);
    const ctx = c.getContext('2d');
    ctx.drawImage(image, 0, 0);
    const imgData = ctx.getImageData(0, 0, c.width, c.height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      let y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      y = y < 128 ? y * 0.9 : 255 - (255 - y) * 0.9;
      const v = y < 140 ? 0 : 255;
      data[i] = data[i + 1] = data[i + 2] = v;
    }
    ctx.putImageData(imgData, 0, 0);
    const out = fs.createWriteStream(outputPath);
    const stream = c.createPNGStream();
    return new Promise((resolve, reject) => {
      stream.pipe(out);
      out.on('finish', resolve);
      out.on('error', reject);
    });
  });
}

export async function ocrPNG(path, { whitelist = '0123456789.-' } = {}) {
  const pre = path.replace(/\.png$/i, '.pre.png');
  try { await preprocessPNG(path, pre); } catch {}

  const doOcr = async (p) => {
    const result = await Tesseract.recognize(p, 'eng', {
      tessedit_char_whitelist: whitelist,
      logger: () => {}
    });
    return (result.data.text || '').trim();
  };

  const primary = await doOcr(pre).catch(() => '');
  if (primary) return primary;
  return await doOcr(path);
}