import { LinkButton } from "@/components/ui/button";

export function HeroCinematic() {
  return (
    <section className="relative flex min-h-[65svh] items-center overflow-hidden border-b border-line bg-ink lg:min-h-[70vh]">
      <div className="absolute inset-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/museum-hero.jpg" alt="" className="h-full w-full object-cover" loading="eager" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink to-transparent" />
      </div>
      <div className="relative mx-auto w-full max-w-[1720px] px-4 py-20 sm:px-8 lg:px-12">
        <div className="max-w-xl">
          <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-paper sm:text-6xl">Discover the history of anime.</h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-paper-2">Explore the films, creators, and studios that shaped Japanese animation.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/anime" size="lg">Browse anime</LinkButton>
            <LinkButton href="/museum" variant="outline" size="lg" className="bg-ink/50">Enter the museum</LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
