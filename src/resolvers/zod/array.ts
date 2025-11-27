import z, { type ZodArray } from "zod"

export function ZDArray(schema: ZodArray): ZodArray {
  return z.array(schema)
}
