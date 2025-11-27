import z, { type ZodType } from "zod"

export function ZDTuple(
  schemas: [z.core.SomeType, ...z.core.SomeType[]],
): ZodType {
  return z.tuple(schemas)
}
