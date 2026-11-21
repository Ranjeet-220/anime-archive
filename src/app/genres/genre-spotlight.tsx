import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { GenreDto } from "@/lib/types";
import { pluralize } from "@/lib/utils";
import styles from "./genre-spotlight.module.css";

const selections = [
  { genre: "action", poster: "demon-slayer", film: "Demon Slayer" },
  { genre: "fantasy", poster: "princess-mononoke", film: "Princess Mononoke" },
  { genre: "science-fiction", poster: "akira", film: "Akira" },
  { genre: "drama", poster: "a-silent-voice", film: "A Silent Voice" },
  { genre: "thriller", poster: "perfect-blue", film: "Perfect Blue" },
];

export function GenreSpotlight({ genres }: { genres: GenreDto[] }) {
  const bySlug = new Map(genres.map((genre) => [genre.slug, genre]));
  const panels = selections.flatMap((selection) => {
    const genre = bySlug.get(selection.genre);
    return genre?.animeCount ? [{ ...selection, genre }] : [];
  });
  if (!panels.length) return null;

  return (
    <nav className={styles.strip} aria-label="Featured genres">
      {panels.map(({ genre, film, poster }, index) => (
        <Link className={styles.panel} href={`/anime?genre=${genre.slug}`} key={genre.slug}>
          <Image src={`/anime-cards/${poster}.webp`} alt="" fill unoptimized
            loading={index === 0 ? "eager" : "lazy"} className={styles.art} />
          <div className={styles.shade} />
          <span className={styles.credit}>{film}</span>
          <div className={styles.caption}>
            {genre.japaneseName && <span lang="ja" className={styles.japanese}>{genre.japaneseName}</span>}
            <span className={styles.title}>{genre.name}</span>
            <span className={styles.meta}>
              {genre.animeCount} {pluralize(genre.animeCount, "title")}
              <ArrowUpRight size={20} aria-hidden />
            </span>
          </div>
        </Link>
      ))}
    </nav>
  );
}
