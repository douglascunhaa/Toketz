const { chromium } = require("@playwright/test");

async function warmPage(page) {
  const positions = [0, window.innerHeight, document.body.scrollHeight / 2, document.body.scrollHeight];
  for (const y of positions) {
    window.scrollTo(0, y);
    await new Promise((resolve) => setTimeout(resolve, 420));
  }
  window.scrollTo(0, 0);
  await new Promise((resolve) => setTimeout(resolve, 700));
}

async function checkViewport(browser, name, viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto("http://localhost:3004", { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForSelector(".premiumScene canvas", { timeout: 30000 });
  await page.evaluate(warmPage);
  await page.screenshot({ path: `diagnostics/premium-${name}.png`, fullPage: true });

  const result = await page.evaluate(async () => {
    const canvases = Array.from(document.querySelectorAll("canvas"));
    const loopTrack = document.querySelector(".loopTrack");
    const bodyWidth = document.documentElement.scrollWidth;
    const viewportWidth = window.innerWidth;
    const before = getComputedStyle(loopTrack).transform;
    await new Promise((resolve) => setTimeout(resolve, 900));
    const after = getComputedStyle(loopTrack).transform;

    const canvasSamples = canvases.map((canvas) => {
      const rect = canvas.getBoundingClientRect();
      const probe = document.createElement("canvas");
      probe.width = Math.max(1, Math.floor(rect.width));
      probe.height = Math.max(1, Math.floor(rect.height));
      const ctx = probe.getContext("2d");
      ctx.drawImage(canvas, 0, 0, probe.width, probe.height);
      const data = ctx.getImageData(0, 0, probe.width, probe.height).data;
      let samples = 0;
      const stride = Math.max(4, Math.floor(data.length / 1000)) * 4;
      for (let i = 0; i < data.length; i += stride) {
        if (data[i] + data[i + 1] + data[i + 2] > 18) samples += 1;
      }
      return { width: rect.width, height: rect.height, samples };
    });

    return {
      canvases: canvasSamples,
      loopMoving: before !== after,
      horizontalOverflow: bodyWidth > viewportWidth + 2,
      images: Array.from(document.images).filter((img) => img.complete && img.naturalWidth > 0).length,
    };
  });

  await page.close();
  return { name, ...result };
}

(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const checks = [];
  checks.push(await checkViewport(browser, "desktop", { width: 1440, height: 1000 }));
  checks.push(await checkViewport(browser, "mobile", { width: 390, height: 844 }));
  await browser.close();

  console.log(JSON.stringify(checks, null, 2));

  const failed = checks.filter((check) => {
    const hasCanvasPixels = check.canvases.some((canvas) => canvas.width > 200 && canvas.height > 200 && canvas.samples > 10);
    return !hasCanvasPixels || !check.loopMoving || check.horizontalOverflow || check.images < 10;
  });

  if (failed.length) process.exitCode = 1;
})();
