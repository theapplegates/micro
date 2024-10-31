// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";
import { transformerNotationHighlight } from "@shikijs/transformers";


// https://astro.build/config
export default defineConfig({
  site: "https:/micro.paulapplegate.com",
  integrations: [mdx(), sitemap(), react(), tailwind()],

  markdown: {
    shikiConfig: {
      themes: {
        light: "dracula",
        dark: "everforest-light",
      },
      transformers: [transformerNotationHighlight()],
    },
  },

  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },

});
