import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src", "!./src/**/*.spec.ts"],
  clean: true,
  target: "es2022",
  format: ["cjs", "esm"],
  splitting: false,
  bundle: true,
  external: ["@sinclair/typebox", "zod"],
})
