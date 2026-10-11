import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vitest/config";

const STATIC_IMAGE = /\.(avif|gif|jpe?g|png|svg|webp)$/;

function webpSize(file: string) {
  const bytes = readFileSync(file);
  if (bytes.toString("ascii", 0, 4) !== "RIFF") return null;
  const format = bytes.toString("ascii", 12, 16);
  if (format === "VP8X") {
    return {
      width: 1 + bytes.readUIntLE(24, 3),
      height: 1 + bytes.readUIntLE(27, 3),
    };
  }
  if (format === "VP8L") {
    const [a, b, c, d] = bytes.subarray(21, 25);
    return {
      width: 1 + (((b & 0x3f) << 8) | a),
      height: 1 + (((d & 0x0f) << 10) | (c << 2) | ((b & 0xc0) >> 6)),
    };
  }
  if (format === "VP8 ") {
    return {
      width: bytes.readUInt16LE(26) & 0x3fff,
      height: bytes.readUInt16LE(28) & 0x3fff,
    };
  }
  return null;
}

function nextStaticImages(): Plugin {
  return {
    name: "next-static-images",
    enforce: "pre",
    load(id) {
      const [file] = id.split("?");
      if (!file || !STATIC_IMAGE.test(file)) return null;
      const src = `/_next/static/media/${basename(file)}`;
      const size = file.endsWith(".webp") ? webpSize(file) : null;
      const { width, height } = size ?? { width: 1, height: 1 };
      return `export default { src: ${JSON.stringify(src)}, width: ${width}, height: ${height} };`;
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
