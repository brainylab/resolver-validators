import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["!./src/**/*.spec.ts"],
  target: "es2022",
  format: ["esm"],
  splitting: false,
  bundle: true,
  dts: true,
  external: ["typebox", "zod"],
});
