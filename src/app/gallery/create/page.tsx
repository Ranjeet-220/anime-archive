import type { Metadata } from "next";
import { GalleryBuilder3D } from "@/components/gallery/gallery-builder-3d";

export const metadata: Metadata = {
  title: "3D Gallery Builder — Curate Your Virtual Anime Exhibition",
  description:
    "Design and curate your own 3D virtual anime museum room. Select archival posters, custom picture frames, lighting environments, and share your exhibition.",
  alternates: { canonical: "/gallery/create" },
};

export default function CreateGalleryPage() {
  return (
    <div className="w-full bg-[#050607]">
      <GalleryBuilder3D />
    </div>
  );
}
