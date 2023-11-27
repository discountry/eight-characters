// vite.config.ts
/// <reference types="vitest" />
// Configure Vitest (https://vitest.dev/config/)

import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "eight-characters",
      fileName: "eight-characters",
    },
  },
  plugins: [dts()],
  test: {
    // ...
  },
});
