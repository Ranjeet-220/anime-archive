"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

const FADE_MS = 300;
const HOLD_MS = 450;

interface ViewTransitionLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
}

/**
 * Link that fades the screen through crimson before navigating, so
 * 3D→2D route changes feel connected. Falls back to a plain navigation
 * when prefers-reduced-motion is set; the View Transitions API is used
 * when available and simply skipped otherwise.
 */
export function ViewTransitionLink({
  href,
  children,
  onClick,
  ...rest
}: ViewTransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    // Let modifier-click / middle-click open in a new tab normally.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const currentPath = window.location.pathname + window.location.search;
    if (href === currentPath) return;

    e.preventDefault();

    const overlay = document.createElement("div");
    overlay.setAttribute("aria-hidden", "true");
    overlay.style.cssText = [
      "position:fixed",
      "inset:0",
      "z-index:2147483647",
      "pointer-events:none",
      "background:var(--color-crimson-600)",
      "opacity:0",
      `transition:opacity ${FADE_MS}ms ease`,
    ].join(";");
    document.body.appendChild(overlay);

    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      overlay.remove();
    };
    window.addEventListener("beforeunload", cleanup, { once: true });

    // Fade in, then navigate once the screen is covered.
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
    });

    window.setTimeout(() => {
      const doc = document as Document & {
        startViewTransition?: (update: () => void | Promise<void>) => {
          finished: Promise<void>;
        };
      };
      const start = doc.startViewTransition;
      if (start) {
        const transition = start(() => {
          router.push(href);
        });
        transition.finished.catch(() => undefined).finally(cleanup);
      } else {
        router.push(href);
      }
      // Reveal the new page under a fading overlay.
      window.setTimeout(() => {
        overlay.style.opacity = "0";
      }, HOLD_MS);
      window.setTimeout(cleanup, HOLD_MS + FADE_MS + 100);
    }, FADE_MS);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
