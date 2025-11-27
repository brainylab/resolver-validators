import { type ZodArray, type ZodObject, type ZodType, z } from "zod"

import { isObject } from "@/core/utils"

import type { RVTypes } from "@/types/helpers"
import type { RVParams } from "@/types/params"
import type { RVSchema } from "@/types/schema"

import { ZDArray } from "./array"
import { ZDBoolean } from "./boolean"
import { ZDDate } from "./date"
import { ZDNumber } from "./number"
import { ZDString } from "./string"
import { ZDTuple } from "./tuple"

type PrimitiveSchema = {
  type: RVTypes
  schema?: RVSchema
  schemas?: RVSchema[]
  params?: RVParams
  optional?: boolean
}

type ResolverObjectSchema = {
  type: "object"
  schema: { [key: string]: PrimitiveSchema }
}

function resolverPrimitiveSchema(
  options: PrimitiveSchema,
): ZodType | undefined {
  if (options.type === "string") {
    return ZDString(options.params)
  }

  if (options.type === "number") {
    return ZDNumber(options.params)
  }

  if (options.type === "boolean") {
    return ZDBoolean()
  }

  if (options.type === "date") {
    return ZDDate()
  }

  if (options.type === "array") {
    return ZDArray(
      resolverPrimitiveSchema(options.schema as PrimitiveSchema) as ZodArray,
    )
  }

  if (options.type === "tuple") {
    const tupleResolved = options.schemas
      ?.map((schema) => resolverPrimitiveSchema(schema as PrimitiveSchema))
      .filter(Boolean)

    return ZDTuple(
      tupleResolved as unknown as [z.core.SomeType, ...z.core.SomeType[]],
    )
  }

  if (options.type === "object") {
    return resolverObjectSchema(
      options as unknown as ResolverObjectSchema,
    ) as ZodObject
  }
}

function resolverObjectSchema(opts: ResolverObjectSchema) {
  const resolvedZod: { [key: string]: ZodType } = {}

  const primitiveSchema = opts.schema

  for (const key in primitiveSchema) {
    const value = primitiveSchema[key]

    if (value.type === "required") {
      const resolveOptional = resolverPrimitiveSchema(
        value.schema as PrimitiveSchema,
      ) as ZodType

      resolvedZod[key] = resolveOptional

      continue
    }

    if (["optional", "nullable"].includes(value.type)) {
      const type = value.type as "optional" | "nullable"

      const resolveOptional = resolverPrimitiveSchema(
        value.schema as PrimitiveSchema,
      ) as ZodType

      resolvedZod[key] = resolveOptional[type]()
      continue
    }

    if (value.type === "or" && value.schemas) {
      const firstSchema = resolverPrimitiveSchema(
        value.schemas[0] as PrimitiveSchema,
      ) as ZodType

      const secondSchema = resolverPrimitiveSchema(
        value.schemas[1] as PrimitiveSchema,
      ) as ZodType

      resolvedZod[key] = firstSchema.or(secondSchema)
      continue
    }

    resolvedZod[key] = resolverPrimitiveSchema(value) as ZodType
  }

  return z.object(resolvedZod) as ZodObject
}

export function resolver(schema: RVSchema): ZodType | ZodObject {
  if (isObject(schema)) {
    return resolverObjectSchema(schema as ResolverObjectSchema)
  }

  return resolverPrimitiveSchema(schema as PrimitiveSchema) as ZodType
}
