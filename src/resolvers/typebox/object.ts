import { type TObject, Type } from "@sinclair/typebox"

export function TBObject(schema: TObject): TObject {
  return Type.Object(schema)
}
