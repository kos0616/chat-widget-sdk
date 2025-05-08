import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
// import packageJson from "./package.json"; // 引入 package.json

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin(), // 使用插件將 CSS 注入到 JS 中
    tailwindcss(),
  ],
  build: {
    outDir: "docs",
    lib: {
      entry: fileURLToPath(new URL("src/main.ts", import.meta.url)),
      name: "ChatWidget",
      fileName: (format) => `chat-widget.${format}.js`,
      formats: ["umd"],
    },
    rollupOptions: {
      output: {
        globals: { vue: "Vue" },
      },
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"), // 替換 process.env.NODE_ENV
    BUILD_TIME: JSON.stringify(new Date().toISOString()),
  },
});
