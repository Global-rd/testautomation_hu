import type { Page } from "@playwright/test";

export const CANVAS_RENDER_DELAY = 200;

export async function getCanvasCenter(page: Page) {
  const bb = await page.evaluate(() => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement | null;
    const r = canvas?.getBoundingClientRect();
    return r ? { x: r.x, y: r.y, w: r.width, h: r.height } : null;
  });
  if (!bb) throw new Error("Canvas not found");
  return { x: bb.x + bb.w / 2, y: bb.y + bb.h / 2 };
}
// A vászon tényleges méretének lekérése
export async function getCanvasDimensions(page: Page) {
  return await page.evaluate(() => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement | null;
    if (!canvas) throw new Error("Canvas not found");
    return { width: canvas.width, height: canvas.height };
  });
}

export async function maybeAdjustForWebKit(
  page: Page,
  size: { width: number; height: number }
) {
  // WebKit alatt a canvas.width/height devicePixelRatio-val skálázott lehet
  const isWebKit = (await page.context().browser()?.version())?.includes(
    "WebKit"
  );
  if (!isWebKit) return size;
  const dpr = await page.evaluate(() => window.devicePixelRatio);
  return { width: size.width / dpr, height: size.height / dpr };
}