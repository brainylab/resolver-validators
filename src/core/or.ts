import type { RVOr } from "@/types/or"
import type { RVSchema } from "@/types/schema"

export function or<A extends RVSchema, B extends RVSchema>(
  a: A,
  b: B,
): RVOr<[A, B]> {
  return {
    type: "or",
    schemas: [a, b],
  } as never
}
