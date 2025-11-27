import type { RVArray } from "@/types/array"
import type { RVSchema } from "@/types/schema"

export function array<T extends RVSchema>(schema: T): RVArray<T> {
  return {
    type: "array",
    schema,
  } as never
}
