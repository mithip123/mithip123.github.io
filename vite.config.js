import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import prerender from "@prerenderer/rollup-plugin";
import PuppeteerRenderer from "@prerenderer/renderer-puppeteer";
import compression from "vite-plugin-compression";

export default defineConfig({
  base: "/",
  plugins: [
    react(),

    // gzip + brotli
    compression({ algorithm: "gzip" }),
    compression({ algorithm: "brotliCompress", ext: ".br" }),

    prerender({
      routes: ["/", "/portfolio", "/interests", "/articles"],
      renderer: new PuppeteerRenderer({
        renderAfterTime: 2200,
      }),
    }),
  ],
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});