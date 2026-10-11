import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vitest/config";

const STATIC_IMAGE = /\.(avif|gif|jpe?g|png|svg|webp)$/;

function nextStaticImages(): Plugin {
  return {
    name: "next-static-images",
    enforce: "pre",
    load(id) {
      const [file] = id.split("?");
      if (!file || !STATIC_IMAGE.test(file)) return null;
      const src = `/_next/static/media/${basename(file)}`;
      return `export default { src: ${JSON.stringify(src)}, width: 1, height: 1 };`;
    },
  };
}

export default defineConfig({
  plugins: [nextStaticImages()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    restoreMocks: true,
  },
});
