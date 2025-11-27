import type { RVSchema } from "@/types/schema"

export const isObject = (schema: RVSchema) => schema.type === "object"
export const isArray = (schema: RVSchema) => schema.type === "array"
export const isTuple = (schema: RVSchema) => schema.type === "tuple"
