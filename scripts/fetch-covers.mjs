import { readFileSync, writeFileSync, existsSync } from "fs";
import { chromium } from "/home/ranjeet/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";

const onlyArg = process.argv.find((a) => a.startsWith("--slugs="));
const only = onlyArg ? onlyArg.slice(8).split(",") : null;

const file = readFileSync("prisma/seed-data/anime-60-cards.ts", "utf8");
const slugs = [...file.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
const titles = [...file.matchAll(/title: "([^"]+)"/g)].map((m) => m[1]);
const years = [...file.matchAll(/year: (\d+)/g)].map((m) => parseInt(m[1]));
const outDir = "public/anime-cards";

async function anilist(query) {
  const q = JSON.stringify({
    query: `query($s:String){Media(search:$s,type:ANIME){id title{romaji english} coverImage{extraLarge} startDate{year}}}`,
    variables: { s: query },
  });
  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: q,
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error("API " + res.status);
  return (await res.json())?.data?.Media ?? null;
}

const browser = await chromium.launch({ headless: true, channel: "chrome" });
const page = await browser.newPage();
const convert = async (buf) =>
  page.evaluate(async (b64) => {
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = "data:image/png;base64," + b64; });
    const c = document.createElement("canvas");
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    c.getContext("2d").drawImage(img, 0, 0);
    return { data: c.toDataURL("image/webp", 0.92).split(",")[1], w: img.naturalWidth, h: img.naturalHeight };
  }, buf.toString("base64"));

let ok = 0, skipped = 0;
for (let i = 0; i < slugs.length; i++) {
  const slug = slugs[i], title = titles[i], year = years[i];
  if (only && !only.includes(slug)) continue;
  const target = `${outDir}/${slug}.webp`;
  if (existsSync(target)) {
    const b = readFileSync(target);
    if (b.length > 40000) { ok++; console.log(`✓ ${slug} (existing ${(b.length/1024).toFixed(0)}KB)`); continue; }
  }
  console.log(`→ ${slug} ("${title}")`);
  let media = null;
  try { media = await anilist(title); } catch (e) { skipped++; console.log(`  ✗ ${String(e).slice(0, 40)}`); await new Promise((r) => setTimeout(r, 5000)); continue; }
  if (!media) { skipped++; console.log(`  ✗ no API result`); await new Promise((r) => setTimeout(r, 2500)); continue; }
  const mTitle = media.title?.english ?? media.title?.romaji ?? "";
  const mYear = media.startDate?.year ?? 0;
  if (mYear && year && Math.abs(mYear - year) > 2) {
    console.log(`  mismatch: ${mTitle} (${mYear}) vs ${year}`);
    try { media = await anilist(title + " " + year); } catch (e) { skipped++; console.log(`  ✗ ${String(e).slice(0, 40)}`); continue; }
    if (!media || Math.abs((media.startDate?.year ?? 0) - year) > 2) { skipped++; console.log(`  ✗ year mismatch, skipped`); await new Promise((r) => setTimeout(r, 2500)); continue; }
  }
  const url = media.coverImage?.extraLarge;
  if (!url) { skipped++; console.log(`  ✗ no cover`); continue; }
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!r.ok) throw new Error("fetch " + r.status);
    const buf = Buffer.from(await r.arrayBuffer());
    const webp = await convert(buf);
    writeFileSync(target, Buffer.from(webp.data, "base64"));
    ok++;
    console.log(`  ✓ ${webp.w}x${webp.h} ${(readFileSync(target).length/1024).toFixed(0)}KB`);
  } catch (e) {
    skipped++;
    console.log(`  ✗ ${String(e).slice(0, 80)}`);
  }
  await new Promise((r) => setTimeout(r, 2500));
}
console.log(`DONE: ${ok} ok, ${skipped} skipped`);
await browser.close();
