import z, { type ZodObject } from "zod"

export function ZDObject(schema: ZodObject) {
  return z.object(schema)
}
