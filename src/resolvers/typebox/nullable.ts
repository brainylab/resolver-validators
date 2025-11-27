import { type TNull, type TSchema, Type } from "@sinclair/typebox"

export function TBNullable(schema: TSchema): TNull {
  return Type.Null(schema)
}
