import { type ZodType, z } from "zod"

import type { RVStringParams } from "@/types/string"

export function ZDString(params?: RVStringParams): ZodType {
  if (params?.format) return z.email()
  if (params?.pattern) z.regex(params.pattern as RegExp)

  const sSchema = z.string()

  if (params?.min) sSchema.min(params.min)
  if (params?.max) sSchema.max(params.max)

  if (params?.description) sSchema.describe(params.description)

  return sSchema
}
