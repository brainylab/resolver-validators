import type { RVParams } from "./params"
import type { RVSchema } from "./schema"

export type RVStringParams = RVParams & {
  format?: "email"
  pattern?: string | RegExp
}

export interface RVString extends RVSchema {
  type: "string"
  infer: string
  params?: RVStringParams
}
