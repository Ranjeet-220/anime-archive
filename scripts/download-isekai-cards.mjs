import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const list = [
  { slug: 'the-rising-of-the-shield-hero', title: 'The Rising of the Shield Hero', year: 2019 },
  { slug: 'the-eminence-in-shadow', title: 'The Eminence in Shadow', year: 2022 },
  { slug: 'the-saga-of-tanya-the-evil', title: 'The Saga of Tanya the Evil', year: 2017 },
  { slug: 'tsukimichi-moonlit-fantasy', title: 'Tsukimichi: Moonlit Fantasy', year: 2021 },
  { slug: 'arifureta-from-commonplace-to-worlds-strongest', title: 'Arifureta: From Commonplace to World\'s Strongest', year: 2019 },
  { slug: 'cautious-hero-the-hero-is-overpowered-but-overly-cautious', title: 'Cautious Hero: The Hero Is Overpowered but Overly Cautious', year: 2019 },
  { slug: 'log-horizon', title: 'Log Horizon', year: 2013 },
  { slug: 'grimgar-ashes-and-illusions', title: 'Grimgar: Ashes and Illusions', year: 2016, search: 'Hai to Gensou no Grimgar' },
  { slug: 'the-devil-is-a-part-timer', title: 'The Devil Is a Part-Timer!', year: 2013 },
  { slug: 'gate', title: 'Gate', year: 2015, search: 'GATE Jieitai Kanochi nite' },
  { slug: 'problem-children-are-coming-from-another-world', title: 'Problem Children Are Coming from Another World, Aren\'t They?', year: 2013, search: 'Mondaiji-tachi ga Isekai' },
  { slug: 'drifters', title: 'Drifters', year: 2016 },
  { slug: 'how-not-to-summon-a-demon-lord', title: 'How Not to Summon a Demon Lord', year: 2018 },
  { slug: 'wise-mans-grandchild', title: 'Wise Man\'s Grandchild', year: 2019 },
  { slug: 'in-another-world-with-my-smartphone', title: 'In Another World With My Smartphone', year: 2017 },
  { slug: 'death-march-to-the-parallel-world-rhapsody', title: 'Death March to the Parallel World Rhapsody', year: 2018 },
  { slug: 'black-summoner', title: 'Black Summoner', year: 2022 },
  { slug: 'skeleton-knight-in-another-world', title: 'Skeleton Knight in Another World', year: 2022 },
  { slug: 'the-worlds-finest-assassin-gets-reincarnated-in-another-world-as-an-aristocrat', title: 'The World\'s Finest Assassin Gets Reincarnated in Another World as an Aristocrat', year: 2021, search: 'Sekai Saikou no Ansatsusha' },
  { slug: 'seirei-gensouki-spirit-chronicles', title: 'Seirei Gensouki: Spirit Chronicles', year: 2021 },
  { slug: 'the-8th-son-are-you-kidding-me', title: 'The 8th Son? Are You Kidding Me?', year: 2020 },
  { slug: 'the-master-of-ragnarok-and-blesser-of-einherjar', title: 'The Master of Ragnarok & Blesser of Einherjar', year: 2018 },
  { slug: 'isekai-cheat-magician', title: 'Isekai Cheat Magician', year: 2019 },
  { slug: 'my-next-life-as-a-villainess-all-routes-lead-to-doom', title: 'My Next Life as a Villainess: All Routes Lead to Doom!', year: 2020, search: 'Otome Game no Hametsu Flag' },
  { slug: 'ascendance-of-a-bookworm', title: 'Ascendance of a Bookworm', year: 2019 },
  { slug: 'restaurant-to-another-world', title: 'Restaurant to Another World', year: 2017 },
  { slug: 'kuma-kuma-kuma-bear', title: 'Kuma Kuma Kuma Bear', year: 2020 },
  { slug: 'so-im-a-spider-so-what', title: 'So I\'m a Spider, So What?', year: 2021, search: 'Kumo desu ga' },
  { slug: 'the-saints-magic-power-is-omnipotent', title: 'The Saint\'s Magic Power Is Omnipotent', year: 2021 },
  { slug: 'by-the-grace-of-the-gods', title: 'By the Grace of the Gods', year: 2020 },
  { slug: 'campfire-cooking-in-another-world-with-my-absurd-skill', title: 'Campfire Cooking in Another World with My Absurd Skill', year: 2023, search: 'Tondemo Skill de Isekai Hourou Meshi' },
  { slug: 'handyman-saitou-in-another-world', title: 'Handyman Saitou in Another World', year: 2023 },
  { slug: 'uncle-from-another-world', title: 'Uncle from Another World', year: 2022 },
  { slug: 'i-got-a-cheat-skill-in-another-world', title: 'I Got a Cheat Skill in Another World and Became Unrivaled in the Real World, Too', year: 2023, search: 'I Got a Cheat Skill in Another World' },
  { slug: 'the-faraway-paladin', title: 'The Faraway Paladin', year: 2021 },
  { slug: 'the-fruit-of-evolution', title: 'The Fruit of Evolution: Before I Knew It, My Life Had It Made', year: 2021, search: 'Shinka no Mi' },
  { slug: 'farming-life-in-another-world', title: 'Farming Life in Another World', year: 2023 },
  { slug: 'the-aristocrats-otherworldly-adventure', title: 'The Aristocrat\'s Otherworldly Adventure: Serving Gods Who Go Too Far', year: 2023, search: 'Tensei Kizoku no Isekai Boukenroku' },
  { slug: 'sweet-reincarnation', title: 'Sweet Reincarnation', year: 2023 },
  { slug: 'the-great-cleric', title: 'The Great Cleric', year: 2023 },
  { slug: 'my-instant-death-ability-is-so-overpowered', title: 'My Instant Death Ability Is So Overpowered', year: 2024, search: 'Sokushi Cheat ga Saikyou Sugite' },
  { slug: 'the-wrong-way-to-use-healing-magic', title: 'The Wrong Way to Use Healing Magic', year: 2024 },
  { slug: 'the-new-gate', title: 'The New Gate', year: 2024 },
  { slug: 'failure-frame', title: 'Failure Frame: I Became the Strongest and Annihilated Everything with Low-Level Spells', year: 2024, search: 'Hazurewaku no Joutai Ijou' },
  { slug: 'quality-assurance-in-another-world', title: 'Quality Assurance in Another World', year: 2024 },
  { slug: 'the-strongest-magician-in-the-demon-lords-army-was-a-human', title: 'The Strongest Magician in the Demon Lord\'s Army Was a Human', year: 2024, search: 'Maougun Saikyou no Majutsushi' },
  { slug: 'chillin-in-another-world-with-level-2-super-cheat-powers', title: 'Chillin\' in Another World with Level 2 Super Cheat Powers', year: 2024, search: 'Lv2 kara Cheat' },
  { slug: 'the-twelve-kingdoms', title: 'The Twelve Kingdoms', year: 2002 },
  { slug: 'magic-knight-rayearth', title: 'Magic Knight Rayearth', year: 1994 },
  { slug: 'fushigi-yuugi', title: 'Fushigi Yuugi', year: 1995 }
];

const outDir = 'public/anime-cards';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function searchAnilist(term) {
  const query = `query($s:String){Media(search:$s,type:ANIME){id title{english romaji} coverImage{extraLarge large} bannerImage}}`;
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { s: term } }),
    signal: AbortSignal.timeout(10000)
  });
  if (!res.ok) throw new Error('Status ' + res.status);
  const data = await res.json();
  return data?.data?.Media;
}

const results = {};

for (const item of list) {
  const targetPath = path.join(outDir, `${item.slug}.webp`);
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 10000) {
    console.log(`[SKIP] Already exists: ${item.slug}`);
    results[item.slug] = `/anime-cards/${item.slug}.webp`;
    continue;
  }

  const queryTerm = item.search || item.title;
  let media = null;
  try {
    media = await searchAnilist(queryTerm);
  } catch (err) {
    console.error(`[ERR] Failed search for ${queryTerm}: ${err.message}`);
    await new Promise(r => setTimeout(r, 2000));
    try {
      media = await searchAnilist(item.title);
    } catch {}
  }

  const imgUrl = media?.coverImage?.extraLarge || media?.coverImage?.large;
  if (!imgUrl) {
    console.warn(`[WARN] No cover image found for ${item.title}`);
    continue;
  }

  try {
    const imgRes = await fetch(imgUrl, { signal: AbortSignal.timeout(15000) });
    const buf = Buffer.from(await imgRes.arrayBuffer());
    const webpBuf = await sharp(buf).resize(550, 780, { fit: 'cover' }).webp({ quality: 85 }).toBuffer();
    fs.writeFileSync(targetPath, webpBuf);
    console.log(`[OK] Saved ${item.slug}.webp (${(webpBuf.length / 1024).toFixed(1)} KB)`);
    results[item.slug] = imgUrl;
  } catch (err) {
    console.error(`[ERR] Failed image download for ${item.slug}: ${err.message}`);
  }

  await new Promise(r => setTimeout(r, 450));
}

fs.writeFileSync('scripts/isekai-image-urls.json', JSON.stringify(results, null, 2));
console.log('Finished downloading card images!');
