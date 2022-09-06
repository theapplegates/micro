import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import picture from '@astrojs/image';
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: 'https://micro.paulapplegate.com',
  integrations: [mdx(), sitemap(), image()]
});
