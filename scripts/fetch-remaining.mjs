import { writeFileSync, readFileSync } from "fs";
import { chromium } from "/home/ranjeet/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";

const JOBS = [
  ["demon-slayer", "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg"],
  ["jojos-bizarre-adventure", "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx14719-VT5dRzTBSZ0w.jpg"],
  ["kimba-the-white-lion", "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/1572-IIMmL0Mpbpop.png"],
];
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const page = await browser.newPage();
for (const [slug, url] of JOBS) {
  const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
  const buf = Buffer.from(await r.arrayBuffer());
  const webp = await page.evaluate(async (b64) => {
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = "data:image/png;base64," + b64; });
    const c = document.createElement("canvas");
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    c.getContext("2d").drawImage(img, 0, 0);
    return { data: c.toDataURL("image/webp", 0.92).split(",")[1], w: img.naturalWidth, h: img.naturalHeight };
  }, buf.toString("base64"));
  writeFileSync(`public/anime-cards/${slug}.webp`, Buffer.from(webp.data, "base64"));
  console.log(`✓ ${slug} ${webp.w}x${webp.h} ${(readFileSync(`public/anime-cards/${slug}.webp`).length/1024).toFixed(0)}KB`);
}
await browser.close();
