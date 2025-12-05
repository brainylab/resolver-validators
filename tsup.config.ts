import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src", "!./src/**/*.spec.ts"],
  target: "es2022",
  format: ["esm"],
  splitting: false,
  bundle: false,
  dts: true,
  external: ["typebox", "zod", "@sinclair/typebox"],
});
