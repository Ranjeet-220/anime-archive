import { redirect } from "next/navigation";

export default async function GenreDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/anime?genre=${slug}`);
}
