export const prerender = false;

import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { db } from "../../../db";
import { eq, sql } from "drizzle-orm";
import { viewCount } from "../../../db/schema";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "../../../db/upstash";

export const GET: APIRoute = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const blogSlug = searchParams.get("slug") ?? "";
  const list = await getCollection("blog");

  const filteredSlug = list.find(({ slug }) => slug === blogSlug);

  if (!filteredSlug) {
    return new Response(
      JSON.stringify({ message: `${blogSlug} slug not found` }),
      {
        status: 404,
      }
    );
  }

  try {
    const countDetails = await db.query.viewCount.findFirst({
      where: eq(viewCount?.slug, blogSlug),
    });

    if (countDetails) {
      return new Response(JSON.stringify({ count: countDetails.views }), {
        status: 200,
      });
    }

    return new Response(JSON.stringify({ count: 0 }), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ message: "Failed to retrieve count" }),
      { status: 500 }
    );
  }
};

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, "60 s"),
});

export const POST: APIRoute = async ({ request }) => {
  const slugDetails = await request.json();
  const { slug: blogSlug = "" }: { slug?: string } = slugDetails;
  const list = await getCollection("blog");

  const filteredSlug = list.find(({ slug }) => slug === blogSlug);
  const headers = request.headers;
  const requestIP = headers.get("x-forwarded-for") ?? "";
  const fallbackIP =
    headers.get("cf-connecting-ip") || headers.get("x-real-ip") || "0.0.0.0";

  if (!filteredSlug) {
    return new Response(JSON.stringify({ message: "invalid slug" }), {
      status: 400,
    });
  }

  const ip = `${requestIP || fallbackIP}/${blogSlug}`;

  try {
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return new Response(JSON.stringify({ message: "Too many requests!" }), {
        status: 429,
        headers: {
          "Retry-After": "60", // 60 seconds until they can try again
        },
      });
    }

    const existingRecord = await db
      .select()
      .from(viewCount)
      .where(eq(viewCount.slug, blogSlug))
      .execute();
    if (existingRecord.length > 0) {
      await db
        .update(viewCount)
        .set({ views: sql`${viewCount.views} + 1` }) // Increment views by 1
        .where(eq(viewCount.slug, blogSlug)) // Use eq here as well
        .execute();
    } else {
      await db
        .insert(viewCount)
        .values({
          slug: blogSlug,
          views: 1,
        })
        .execute();
    }
    return new Response(
      JSON.stringify({ message: "Successfully Incremented Count" }),
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }
    return new Response(
      JSON.stringify({ message: "Failed to increment count" }),
      { status: 500 }
    );
  }
};
