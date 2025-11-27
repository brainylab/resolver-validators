import type { RVSchema } from "./schema"

export interface RVNullable<T extends RVSchema> extends RVSchema {
  type: "nullable"
  schema: T
  infer: T extends { infer: infer U } ? U | null : null
}
