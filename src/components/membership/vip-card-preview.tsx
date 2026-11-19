"use client";

import { useState, useRef } from "react";
import { Sparkles, ShieldCheck, QrCode } from "lucide-react";

export function VipCardPreview({
  memberName = "MASTER CURATOR",
  tier = "MUSEUM CURATOR",
  memberNumber = "#AA-8849",
  issueDate = "2026 / 08",
}: {
  memberName?: string;
  tier?: string;
  memberNumber?: string;
  issueDate?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 12;

    setRotX(rX);
    setRotY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.6,
    });
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
    setGlarePos((p) => ({ ...p, opacity: 0 }));
  };

  return (
    <div className="perspective-[1000px] flex items-center justify-center p-4">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transition: rotX === 0 ? "transform 0.5s ease-out" : "none",
        }}
        className="relative h-64 w-[400px] sm:h-72 sm:w-[460px] cursor-pointer select-none overflow-hidden rounded-2xl border border-gold-500/40 bg-gradient-to-br from-[#1c1a16] via-[#101114] to-[#08090a] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(227,38,46,0.2)] transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(227,38,46,0.35),0_0_40px_rgba(230,175,46,0.25)]"
      >
        {/* Holographic Sheen Layer */}
        <div
          className="pointer-events-none absolute inset-0 z-30 mix-blend-overlay transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.8) 0%, rgba(255,215,0,0.4) 25%, rgba(227,38,46,0.3) 50%, transparent 80%)`,
            opacity: glarePos.opacity,
          }}
        />

        {/* Subtle Japanese Background Watermark Pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none select-none font-jp font-black text-8xl text-crimson-500 flex items-center justify-center [writing-mode:vertical-rl] overflow-hidden">
          博物館員証
        </div>

        {/* Card Header: Torii Logo + Seal */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden shadow-[0_0_15px_rgba(227,38,46,0.6)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-hd.png"
                alt="Anime Archive Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#F2F2F2]">
                ANIME ARCHIVE
              </span>
              <span className="block text-[8px] font-mono tracking-widest text-[#E6AF2E]">
                VIP PATRON & CURATOR PASS
              </span>
            </div>
          </div>

          {/* Traditional Japanese Hanko Red Seal Stamp */}
          <div className="flex h-11 w-11 items-center justify-center rounded-md border-2 border-[#E3262E] bg-[#E3262E]/15 shadow-[0_0_12px_rgba(227,38,46,0.4)] transform rotate-6">
            <div className="font-jp text-xs font-black text-[#E3262E] leading-tight text-center">
              証印
              <br />
              公認
            </div>
          </div>
        </div>

        {/* Middle: Holographic Chip & Pass Tier */}
        <div className="relative z-10 my-6 flex items-center justify-between">
          {/* Smart Museum Smart Chip */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-12 rounded-md bg-gradient-to-tr from-[#8a6b18] via-[#e6c050] to-[#b38f2a] p-1 shadow-inner flex flex-col justify-between border border-[#e6af2e]/60">
              <div className="h-0.5 w-full bg-black/40" />
              <div className="h-0.5 w-3/4 bg-black/40" />
              <div className="h-0.5 w-full bg-black/40" />
            </div>
            <Sparkles className="h-4 w-4 text-[#E6AF2E] animate-pulse" />
          </div>

          {/* Tier Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E6AF2E]/40 bg-[#E6AF2E]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#E6AF2E]">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{tier}</span>
          </div>
        </div>

        {/* Card Footer: Name, Number, Expiry & QR */}
        <div className="relative z-10 flex items-end justify-between border-t border-white/10 pt-3 text-xs">
          <div>
            <div className="text-[9px] uppercase tracking-widest text-[#9A9A9A]">CURATOR HOLDER</div>
            <div className="font-display font-black text-sm uppercase tracking-wider text-white">
              {memberName}
            </div>
            <div className="mt-0.5 font-mono text-[10px] text-[#E6AF2E]">{memberNumber}</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[8px] uppercase tracking-widest text-[#9A9A9A]">VALID FROM</div>
              <div className="font-mono text-[10px] text-[#D8D8D8]">{issueDate}</div>
            </div>

            {/* Micro QR Verification Icon */}
            <div className="flex h-8 w-8 items-center justify-center rounded bg-white/10 p-1 backdrop-blur-sm border border-white/20">
              <QrCode className="h-6 w-6 text-white/90" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
