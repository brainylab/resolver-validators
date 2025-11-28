import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["!./src/**/*.spec.ts"],
  target: "es2022",
  format: ["cjs", "esm"],
  splitting: false,
  bundle: true,
  dts: true,
  external: ["@sinclair/typebox", "zod"],
});
