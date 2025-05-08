import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "docs",
    lib: {
      // entry: path.resolve(__dirname, 'src/main.ts'),
      entry: fileURLToPath(new URL("src/main.ts", import.meta.url)),
      name: "ChatWidget",
      fileName: (format) => `chat-widget.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: { vue: "Vue" },
      },
    },
  },
});
