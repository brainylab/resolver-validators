import type { RVOptional } from "@/types/optional"
import type { RVSchema } from "@/types/schema"

export function optional<T extends RVSchema>(schema: T): RVOptional<T> {
  return {
    type: "optional",
    schema,
    optional: true,
  } as never
}
