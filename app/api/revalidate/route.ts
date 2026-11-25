import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * On-demand revalidation, called by a Sanity webhook on publish/unpublish/delete.
 *
 * Clears the cached Sanity data for the document type that changed, so the
 * live site shows new content on the next request — no redeploy needed.
 * Each `_type` maps to the `cacheTag`s used in sanity/lib/queries.ts.
 *
 * Webhook setup (sanity.io/manage → API → Webhooks):
 *   URL:        https://<your-domain>/api/revalidate
 *   Trigger on: Create, Update, Delete
 *   Filter:     _type in ["homePage", "siteSettings", "caseStudy"]
 *   Projection: {_type}
 *   Secret:     same value as SANITY_REVALIDATE_SECRET
 */
const TAGS_BY_TYPE: Record<string, string[]> = {
  homePage: ["homePage"],
  caseStudy: ["caseStudy"],
  siteSettings: ["siteSettings"],
};

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET is not set" },
      { status: 500 },
    );
  }

  try {
    // Validates the signature and waits for Sanity's eventual consistency,
    // so the refetch after revalidation sees the newly published content.
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret, true);

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    const tags = body?._type ? TAGS_BY_TYPE[body._type] : undefined;
    if (!tags) {
      return NextResponse.json(
        { message: `Nothing to revalidate for type "${body?._type ?? "unknown"}"` },
        { status: 200 },
      );
    }

    // expire: 0 → the next visitor gets fresh content instead of a stale copy.
    for (const tag of tags) revalidateTag(tag, { expire: 0 });

    return NextResponse.json({ revalidated: true, tags, now: Date.now() });
  } catch (error) {
    console.error("Revalidation webhook failed", error);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
