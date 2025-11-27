import { type ZodNumber, z } from "zod"

import type { RVNumberParams } from "@/types/number"

export function ZDNumber(params?: RVNumberParams): ZodNumber {
  const nSchema = z.number()

  if (params?.min) nSchema.min(params.min)
  if (params?.max) nSchema.max(params.max)
  if (params?.description) nSchema.describe(params.description)

  return nSchema
}
