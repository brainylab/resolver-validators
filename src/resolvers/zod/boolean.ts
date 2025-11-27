import z, { type ZodBoolean } from "zod"

export function ZDBoolean(): ZodBoolean {
  return z.boolean()
}
