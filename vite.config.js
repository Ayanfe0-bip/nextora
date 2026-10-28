import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "images/nextora-logo.png"
      ],

      manifest: {
        id: "/",
        name: "NEXTORA — Where Opportunities Begin",
        short_name: "NEXTORA",

        description:
          "Discover jobs, scholarships, grants, internships, training, and competitions. Build valuable skills with Nextora Academy.",

        theme_color: "#ffffff",
        background_color: "#ffffff",

        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",

        icons: [
          {
            src: "/images/nextora-logo.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "any"
          }
        ]
      }
    })
  ],

  server: {
    host: "0.0.0.0"
  },

  build: {
    outDir: "dist",
    sourcemap: false
  }
});
