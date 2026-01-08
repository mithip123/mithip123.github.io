import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import prerender from "@prerenderer/rollup-plugin";
import PuppeteerRenderer from "@prerenderer/renderer-puppeteer";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    prerender({
      routes: ["/", "/portfolio", "/interests", "/articles"],
      renderer: new PuppeteerRenderer({
        // give the SPA time to render
        renderAfterTime: 1500,
      }),
    }),
  ],
});