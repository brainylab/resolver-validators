import type { RVBoolean } from "@/types/boolean"

export function boolean(): RVBoolean {
  return {
    type: "boolean",
  } as never
}
