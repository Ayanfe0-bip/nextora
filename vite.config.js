import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "images/nextora-logo.png",
        "images/nextora-192.png",
        "images/nextora-512.png"
      ],

      manifest: {
        id: "/",
        name: "NEXTORA — Where Opportunities Begin",
        short_name: "NEXTORA",

        description:
          "Discover jobs, scholarships, grants, internships, training, and competitions. Build valuable skills with Nextora Academy.",

        lang: "en",
        start_url: "/",
        scope: "/",

        display: "standalone",
        orientation: "portrait",

        theme_color: "#ffffff",
        background_color: "#ffffff",

        icons: [
          {
            src: "/images/nextora-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/images/nextora-512.png",
            sizes: "512x512",
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
