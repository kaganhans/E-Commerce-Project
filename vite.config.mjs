import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: resolve(__dirname, "postcss.config.js"),
  },
  server: {
    proxy: {
      // Frontend'te /api ile başlayan istekleri backend'e yönlendir
      "/api": {
        target: "http://localhost:3000", // ← backend origin (sende neyse onu yaz)
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""), // /api/user/address -> /user/address
      },
    },
  },
});
