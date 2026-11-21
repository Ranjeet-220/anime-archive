BEGIN;

-- The old seed assigned this exact timestamp to every unreviewed source.
UPDATE "Source" SET "verificationStatus" = 'PENDING', "verificationDate" = NULL
WHERE "verificationStatus" = 'VERIFIED' AND "contributorId" IS NULL
  AND "verificationDate" = TIMESTAMP '2026-08-01 00:00:00';

UPDATE "Anime" SET
  "historicalSignificance" = CASE WHEN md5("historicalSignificance") = '1dd7dfabcbe5bd5a06621857abb2468e' THEN NULL ELSE "historicalSignificance" END,
  "productionHistory" = CASE WHEN md5("productionHistory") = 'dab0cf6345b81084d173a5c3f7c99d11' THEN NULL ELSE "productionHistory" END,
  "reception" = CASE WHEN md5("reception") = 'f00c47bf095819c0e63264eb79ec7042' THEN NULL ELSE "reception" END,
  "awards" = CASE WHEN md5("awards") = 'ae3febf2e00bde1df4e888efe67f2b2d' THEN NULL ELSE "awards" END,
  "culturalImpact" = CASE WHEN md5("culturalImpact") = '3ad043ba7c7bb4e84ffa6d62481a9035' THEN NULL ELSE "culturalImpact" END,
  "legacy" = CASE WHEN md5("legacy") = '9fe875ec89fb7fbff5cc0283e0befdec' THEN NULL ELSE "legacy" END,
  "historyTimeline" = CASE WHEN "historyTimeline" = '[{"label": "Publication", "year": "1986", "text": "Diana Wynne Jones publishes the original novel in the UK."}, {"label": "Production", "year": "2003", "text": "Miyazaki begins work amid strong opposition to the Iraq War, reshaping the story into an anti-war allegory."}, {"label": "Release", "year": "2004-09-05", "text": "Opens at the Venice Film Festival and later dominates the Japanese box office."}, {"label": "Recognition", "year": "2006", "text": "Receives an Academy Award nomination for Best Animated Feature."}, {"label": "Legacy", "text": "Remains one of Studio Ghibli''s most successful and beloved films worldwide."}]'::jsonb THEN NULL ELSE "historyTimeline" END
WHERE slug = 'a-silent-voice' AND "isDemoData";

DELETE FROM "AnimeRelation" r USING "Anime" a, "Anime" b
WHERE r."animeId" = a.id AND r."relatedId" = b.id AND a."isDemoData"
  AND a.slug = 'a-silent-voice' AND b.slug = 'spirited-away' AND r.type = 'Ghibli successor';

DELETE FROM "Source" s USING "Anime" a
WHERE s."entityType" = 'anime' AND s."entityId" = a.id AND a.slug = 'a-silent-voice' AND a."isDemoData"
  AND s."sourceUrl" = 'https://en.wikipedia.org/wiki/Howl%27s_Moving_Castle_(film)' AND s."verificationStatus" = 'PENDING' AND s."contributorId" IS NULL;

UPDATE "Anime" SET
  "historicalSignificance" = CASE WHEN md5("historicalSignificance") = '15ef9872aa5431d3ca7b02419dd038e0' THEN NULL ELSE "historicalSignificance" END,
  "productionHistory" = CASE WHEN md5("productionHistory") = '43e3fb2017ce3ceeba45ae97c841b249' THEN NULL ELSE "productionHistory" END,
  "reception" = CASE WHEN md5("reception") = '1351b45244b08de0068dc62bf392e329' THEN NULL ELSE "reception" END,
  "awards" = CASE WHEN md5("awards") = 'fe24e37476e9dc5e054421ab0c49f308' THEN NULL ELSE "awards" END,
  "culturalImpact" = CASE WHEN md5("culturalImpact") = '1ff571889b283db6d1e16917e06fd964' THEN NULL ELSE "culturalImpact" END,
  "legacy" = CASE WHEN md5("legacy") = '5d40bf7d23834a0c6d3a4d98d62433f7' THEN NULL ELSE "legacy" END,
  "historyTimeline" = CASE WHEN "historyTimeline" = '[{"label": "Production", "year": "1987", "text": "Miyazaki develops the story during the production of Nausicaä''s successor at Studio Ghibli."}, {"label": "Release", "year": "1988-04-16", "text": "Opens as a double feature with Grave of the Fireflies."}, {"label": "VHS release", "year": "1989", "text": "Home video release makes the film a lasting fixture of Japanese family viewing."}, {"label": "International", "year": "1990s", "text": "Fox releases an English dub; the film wins international acclaim."}, {"label": "Legacy", "text": "Totoro becomes Studio Ghibli''s mascot and a global symbol of gentle childhood wonder."}]'::jsonb THEN NULL ELSE "historyTimeline" END
WHERE slug = 'princess-mononoke' AND "isDemoData";

DELETE FROM "AnimeRelation" r USING "Anime" a, "Anime" b
WHERE r."animeId" = a.id AND r."relatedId" = b.id AND a."isDemoData"
  AND a.slug = 'princess-mononoke' AND b.slug = 'grave-of-the-fireflies' AND r.type = 'Double feature';

DELETE FROM "Source" s USING "Anime" a
WHERE s."entityType" = 'anime' AND s."entityId" = a.id AND a.slug = 'princess-mononoke' AND a."isDemoData"
  AND s."sourceUrl" = 'https://en.wikipedia.org/wiki/My_Neighbor_Totoro' AND s."verificationStatus" = 'PENDING' AND s."contributorId" IS NULL;

UPDATE "Anime" SET
  "historicalSignificance" = CASE WHEN md5("historicalSignificance") = '09e16984e6cc9f5e3637ffef67000b2f' THEN NULL ELSE "historicalSignificance" END,
  "productionHistory" = CASE WHEN md5("productionHistory") = 'c376fa5275d2e1081f35b1149140769a' THEN NULL ELSE "productionHistory" END,
  "reception" = CASE WHEN md5("reception") = '7e2d1deb4e169fc3a7a6bda8845ef713' THEN NULL ELSE "reception" END,
  "awards" = CASE WHEN md5("awards") = 'a2c2e4aa95ccb233bb6781ebf6282d63' THEN NULL ELSE "awards" END,
  "culturalImpact" = CASE WHEN md5("culturalImpact") = 'b4de298e5739dcabd53c5f93fb233c06' THEN NULL ELSE "culturalImpact" END,
  "legacy" = CASE WHEN md5("legacy") = '98a06f6bbf8b46f7012ae302e86d5f05' THEN NULL ELSE "legacy" END,
  "historyTimeline" = CASE WHEN "historyTimeline" = '[{"label": "Development", "year": "2017", "text": "Shinkai begins writing the story while completing Your Name''s global rollout."}, {"label": "Production", "year": "2018", "text": "Heavy summer rainfall in Tokyo shapes the film''s setting and themes."}, {"label": "Release", "year": "2019-07-19", "text": "Opens in Japan and dominates the box office, becoming the year''s highest-grossing Japanese film."}, {"label": "International", "year": "2019–20", "text": "Rolls out worldwide, becoming a global box office phenomenon."}, {"label": "Legacy", "text": "Confirms Makoto Shinkai as the defining director of streaming-era anime cinema."}]'::jsonb THEN NULL ELSE "historyTimeline" END
WHERE slug = 'grave-of-the-fireflies' AND "isDemoData";

DELETE FROM "AnimeRelation" r USING "Anime" a, "Anime" b
WHERE r."animeId" = a.id AND r."relatedId" = b.id AND a."isDemoData"
  AND a.slug = 'grave-of-the-fireflies' AND b.slug = 'your-name' AND r.type = 'Spiritual successor';

DELETE FROM "Source" s USING "Anime" a
WHERE s."entityType" = 'anime' AND s."entityId" = a.id AND a.slug = 'grave-of-the-fireflies' AND a."isDemoData"
  AND s."sourceUrl" = 'https://en.wikipedia.org/wiki/Weathering_with_You' AND s."verificationStatus" = 'PENDING' AND s."contributorId" IS NULL;

INSERT INTO "Source" (id, "entityType", "entityId", "sourceTitle", "sourceName", "sourceUrl", "verificationStatus", "verificationDate")
SELECT 'review-' || md5(a.id || r.url), 'anime', a.id, r.claim, r.publisher, r.url, 'VERIFIED', DATE '2026-11-22'
FROM (VALUES
  ('spirited-away', 'Hayao Miyazaki directed the film. It opened in Japan on July 20, 2001.', 'Studio Ghibli', 'https://www.ghibli.jp/works/chihiro/'),
  ('spirited-away', 'In 2003, Spirited Away won the Academy Award for Animated Feature.', 'Studio Ghibli chronology', 'https://www.ghibli.jp/chronology/'),
  ('princess-mononoke', 'Hayao Miyazaki directed Princess Mononoke, released in Japan on July 12, 1997.', 'Studio Ghibli', 'https://www.ghibli.jp/works/mononoke/'),
  ('grave-of-the-fireflies', 'Isao Takahata directed the film. Its Japanese release was April 16, 1988.', 'Studio Ghibli', 'https://www.ghibli.jp/works/hotarunohaka/'),
  ('a-silent-voice', 'Naoko Yamada directed this film about Shoko Nishimiya and her former classmate Shoya Ishida.', 'GKIDS', 'https://gkids.com/films/a-silent-voice/'),
  ('perfect-blue', 'Perfect Blue was Satoshi Kon’s directorial debut. Its Japanese theatrical release followed in 1998.', 'GKIDS', 'https://gkids.com/films/perfect-blue/'),
  ('your-name', 'Makoto Shinkai wrote the original story and screenplay and directed the film.', 'CoMix Wave Films', 'https://www.cwfilms.jp/en/products/article/kiminona.html'),
  ('ghost-in-the-shell', 'Mamoru Oshii directed this adaptation of Masamune Shirow’s work. It opened in Japan on November 18, 1995.', 'Production I.G', 'https://www.production-ig.com/contents/works/02_/000037.html'),
  ('akira', 'The BBFC lists 1988 as the production year and Katsuhiro Otomo as director.', 'British Board of Film Classification', 'https://www.bbfc.co.uk/release/akira-q29sbgvjdglvbjpwwc0yotg5mza'),
  ('momotaro-divine-sea-warriors', 'Mitsuyo Seo directed this 1945 film, which MoMA identifies as Japan’s first feature-length animation.', 'Museum of Modern Art', 'https://www.moma.org/calendar/events/7909'),
  ('namakura-gatana', 'Junichi Kouchi’s silent short opened in June 1917. The archive’s longest restored version runs four minutes.', 'National Film Archive of Japan', 'https://animation.filmarchives.jp/en/works/view/100183')
) AS r(slug, claim, publisher, url)
JOIN "Anime" a ON a.slug = r.slug
ON CONFLICT (id) DO NOTHING;

COMMIT;
