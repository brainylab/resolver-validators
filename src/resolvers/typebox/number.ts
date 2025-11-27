import { Type } from "@sinclair/typebox"

import type { NumberOptions, TNumber } from "@sinclair/typebox"
import type { RVNumberParams } from "@/types/number"

export function TBNumber(params?: RVNumberParams): TNumber {
  const typeBoxParams: NumberOptions = {}

  const keys: { [key in keyof RVNumberParams]: string } = {
    min: "minLength",
    max: "maxLength",
    description: "description",
  }

  if (params) {
    for (const key in keys) {
      const mappedKey = keys[key as keyof typeof keys] as keyof RVNumberParams
      if (params[key as keyof RVNumberParams] !== undefined) {
        typeBoxParams[mappedKey] = params[key as keyof RVNumberParams]
      }
    }
  }

  return Type.Number(typeBoxParams)
}
