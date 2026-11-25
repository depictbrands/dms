import { cacheLife, cacheTag } from "next/cache";
import type { SanityImageSource } from "@sanity/image-url";
import { defineQuery } from "next-sanity";

import { isSanityConfigured } from "../env";
import { client } from "./client";

/**
 * Every query goes through here. `cache: "no-store"` keeps Next's fetch cache
 * (which Vercel persists between builds) out of the way, so the tagged
 * `"use cache"` functions below are the only cache layer — and the
 * /api/revalidate webhook can clear them by tag the moment content is published.
 */
function fetchSanity<T>(query: string): Promise<T> {
  return client.fetch<T>(query, {}, { cache: "no-store" });
}

export const HOME_HERO_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0].hero {
    heading,
    body,
    primaryCta { label, href },
    secondaryCta { label, href },
    "videoUrl": backgroundVideo.asset->url,
    "videoMimeType": backgroundVideo.asset->mimeType,
    "posterUrl": posterImage.asset->url
  }
`);

export type HeroContent = {
  heading?: string | null;
  body?: string | null;
  primaryCta?: { label?: string | null; href?: string | null } | null;
  secondaryCta?: { label?: string | null; href?: string | null } | null;
  videoUrl?: string | null;
  videoMimeType?: string | null;
  posterUrl?: string | null;
};

export async function getHomeHero(): Promise<HeroContent | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("homePage");

  if (!isSanityConfigured) return null;

  try {
    return await fetchSanity<HeroContent | null>(HOME_HERO_QUERY);
  } catch (error) {
    console.error("Failed to fetch home hero from Sanity", error);
    return null;
  }
}

export const HOME_CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0].caseStudies {
    intro,
    "items": items[]->{
      _id,
      title,
      shortTitle,
      sector,
      summary,
      metric,
      image,
      "imageAlt": image.alt,
      "pdfUrl": pdf.asset->url
    }
  }
`);

export type CaseStudyContent = {
  _id: string;
  title?: string | null;
  shortTitle?: string | null;
  sector?: string | null;
  summary?: string | null;
  metric?: string | null;
  image?: SanityImageSource | null;
  imageAlt?: string | null;
  pdfUrl?: string | null;
};

export type CaseStudiesContent = {
  intro?: string | null;
  items?: CaseStudyContent[] | null;
};

export async function getHomeCaseStudies(): Promise<CaseStudiesContent | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("homePage", "caseStudy");

  if (!isSanityConfigured) return null;

  try {
    return await fetchSanity<CaseStudiesContent | null>(HOME_CASE_STUDIES_QUERY);
  } catch (error) {
    console.error("Failed to fetch home case studies from Sanity", error);
    return null;
  }
}

export const HOME_SERVICES_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0].services {
    heading,
    cards[] {
      _key,
      color,
      title,
      description,
      "iconUrl": icon.asset->url,
      "iconAspectRatio": icon.asset->metadata.dimensions.aspectRatio,
      services[] { _key, title, description }
    }
  }
`);

export type ServiceCardContent = {
  _key: string;
  color?: "green" | "yellow" | "blue" | null;
  title?: string | null;
  description?: string | null;
  iconUrl?: string | null;
  iconAspectRatio?: number | null;
  services?: { _key: string; title?: string | null; description?: string | null }[] | null;
};

export type ServicesContent = {
  heading?: string | null;
  cards?: ServiceCardContent[] | null;
};

export async function getHomeServices(): Promise<ServicesContent | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("homePage");

  if (!isSanityConfigured) return null;

  try {
    return await fetchSanity<ServicesContent | null>(HOME_SERVICES_QUERY);
  } catch (error) {
    console.error("Failed to fetch home services from Sanity", error);
    return null;
  }
}

export const HOME_PROCESS_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0].process {
    heading,
    intro,
    steps[] { _key, title, description },
    image,
    "imageAlt": image.alt
  }
`);

export type ProcessContent = {
  heading?: string | null;
  intro?: string | null;
  steps?: { _key: string; title?: string | null; description?: string | null }[] | null;
  image?: SanityImageSource | null;
  imageAlt?: string | null;
};

export async function getHomeProcess(): Promise<ProcessContent | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("homePage");

  if (!isSanityConfigured) return null;

  try {
    return await fetchSanity<ProcessContent | null>(HOME_PROCESS_QUERY);
  } catch (error) {
    console.error("Failed to fetch home process from Sanity", error);
    return null;
  }
}

export const HOME_CTA_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0].cta {
    heading,
    body,
    button { label, href },
    image
  }
`);

export type CtaContent = {
  heading?: string | null;
  body?: string | null;
  button?: { label?: string | null; href?: string | null } | null;
  image?: SanityImageSource | null;
};

export async function getHomeCta(): Promise<CtaContent | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("homePage");

  if (!isSanityConfigured) return null;

  try {
    return await fetchSanity<CtaContent | null>(HOME_CTA_QUERY);
  } catch (error) {
    console.error("Failed to fetch home CTA from Sanity", error);
    return null;
  }
}

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    footerDescription,
    social { facebook, instagram, linkedin }
  }
`);

export type SiteSettingsContent = {
  footerDescription?: string | null;
  social?: {
    facebook?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  } | null;
};

export async function getSiteSettings(): Promise<SiteSettingsContent | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("siteSettings");

  if (!isSanityConfigured) return null;

  try {
    return await fetchSanity<SiteSettingsContent | null>(SITE_SETTINGS_QUERY);
  } catch (error) {
    console.error("Failed to fetch site settings from Sanity", error);
    return null;
  }
}
