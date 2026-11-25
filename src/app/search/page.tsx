import type { Metadata } from "next";
import { SearchPage } from "@/components/anime/search-page";
import { isGlobalAnimeSearchEnabled } from "@/lib/global-anime-search";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search the Anime Archive for anime, characters, studios, creators, and historical events.",
};

export default function SearchPageRoute() {
  return <SearchPage globalSearchEnabled={isGlobalAnimeSearchEnabled()} />;
}
