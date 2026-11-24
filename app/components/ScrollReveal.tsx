"use client";

import { useEffect } from "react";

/**
 * Reveals every `[data-reveal]` element the first time it scrolls into view.
 * Styles live in globals.css; the inline script in layout.tsx adds
 * `.reveal-ready` before first paint so nothing flashes.
 */
export default function ScrollReveal() {
  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");

    const reveal = (el: Element) => el.setAttribute("data-revealed", "");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    // Headings start fully clipped (clip-path), which IntersectionObserver
    // treats as zero visible area, so we watch their parent instead.
    const targetsByWatched = new Map<Element, Set<Element>>();
    const watched = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          targetsByWatched.get(entry.target)?.forEach(reveal);
          targetsByWatched.delete(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );

    const observe = () => {
      document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => {
        if (watched.has(el)) return;
        watched.add(el);
        const proxy =
          el.getAttribute("data-reveal") === "heading" ? (el.parentElement ?? el) : el;
        const targets = targetsByWatched.get(proxy) ?? new Set<Element>();
        targets.add(el);
        targetsByWatched.set(proxy, targets);
        observer.observe(proxy);
      });
    };

    observe();

    // Pick up elements added later (e.g. after client-side navigation).
    const mutations = new MutationObserver(observe);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
