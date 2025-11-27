import type { RVNullable } from "@/types/nullable"
import type { RVSchema } from "@/types/schema"

export function nullable<T extends RVSchema>(schema: T): RVNullable<T> {
  return {
    type: "nullable",
    schema,
  } as never
}
