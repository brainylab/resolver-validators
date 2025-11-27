import type { RVObject } from "./object"
import type { RVSchema } from "./schema"

export type RVRequiredParams = { description?: string }

export type RVRequired<T extends RVSchema> =
  T extends RVObject<infer U> ? RVObject<RVRequired<U>> : T
