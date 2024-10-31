import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "../../utils/generateOgImage";

export async function getStaticPaths() {
  const posts = await getCollection("blog");

  return posts.map(post => ({
    params: { slug: post.slug },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const image = await generateOgImageForPost(props as CollectionEntry<"blog">);

  return new Response(image, {
    headers: { "Content-Type": "image/png" },
  });
};
