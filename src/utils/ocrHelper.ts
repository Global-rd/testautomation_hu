import Tesseract from 'tesseract.js';
import { createCanvas, loadImage } from 'canvas';

async function preprocessBufferToBinary(input: Buffer): Promise<Buffer> {
  const img = await loadImage(input);
  const c = createCanvas(img.width, img.height);
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
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
  return c.toBuffer('image/png');
}

async function tryOcrNumber(image: Buffer): Promise<number | null> {
  const { data } = await Tesseract.recognize(image, 'eng', {
    tessedit_char_whitelist: '0123456789.,-−–—()',
    classify_bln_numeric_mode: 1,
    psm: 7
  } as any);

  const rawText = (data.text || '').trim();
  const minusLike = /[-\u2212\u2012\u2013\u2014\u2043]/;
  const firstDigitIdx = rawText.search(/[0-9]/);
  const hasMinusBeforeFirstDigit = firstDigitIdx > -1 && minusLike.test(rawText.slice(0, Math.max(0, firstDigitIdx + 1)));

  let normalized = rawText
    .replace(/[Oo]/g, '0')
    .replace(/[•·]/g, '.')
    .replace(/,/g, '.')
    .replace(/[\u2212\u2012\u2013\u2014\u2043]/g, '-')
    .replace(/\s+/g, '');

  const parenMatch = normalized.match(/\((\d+(?:\.\d+)?)\)/);
  if (parenMatch) {
    return Number('-' + parenMatch[1]);
  }

  normalized = normalized.replace(/[^0-9.\-]/g, '');

  let m = normalized.match(/-?\d+(?:\.\d+)?/);
  let numString = m ? m[0] : '';

  if (numString && !numString.startsWith('-') && hasMinusBeforeFirstDigit) {
    numString = '-' + numString;
  }

  if (!numString) {
    const m2 = rawText.match(/[-\u2212\u2012\u2013\u2014\u2043]?\s*\d+(?:[.,]\d+)?/);
    if (m2) {
      numString = m2[0]
        .replace(/\s+/g, '')
        .replace(/,/g, '.');
    }
  }

  if (!numString) return null;

  const value = Number(numString);
  if (Number.isNaN(value)) return null;
  return value;
}

export async function ocrNumber(buf: Buffer): Promise<number> {
  try {
    const pre = await preprocessBufferToBinary(buf);
    const primary = await tryOcrNumber(pre);
    if (primary !== null) return primary;
  } catch {}

  const fallback = await tryOcrNumber(buf);
  if (fallback === null) {
    try {
      const pre = await preprocessBufferToBinary(buf);
      const primary = await tryOcrNumber(pre);
      if (primary !== null) return primary;
    } catch { /* megyünk tovább hibával */ }
    throw new Error('OCR_EMPTY');
  }
  return fallback;
}