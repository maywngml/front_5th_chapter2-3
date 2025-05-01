import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

const isCI = process.env.CI === "true"

// https://vite.dev/config/
export default defineConfig({
  base: isCI ? "" : "/front_5th_chapter2-3/",
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
  server: {
    proxy: {
      "/api": {
        // target: 'https://jsonplaceholder.typicode.com',
        target: "https://dummyjson.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
