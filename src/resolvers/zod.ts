import { type ZodArray, type ZodObject, type ZodType, z } from "zod";

import type {
  RVBooleanParams,
  RVDateParams,
  RVNumberParams,
  RVParams,
  RVSchema,
  RVStringParams,
  RVTypes,
} from "../types";

import { isObject } from "../utils";

type PrimitiveSchema = {
  type: RVTypes;
  schema?: RVSchema;
  schemas?: RVSchema[];
  params?: RVParams;
  optional?: boolean;
};

type ResolverObjectSchema = {
  type: "object";
  schema: { [key: string]: PrimitiveSchema };
};

function resolverPrimitiveSchema(
  options: PrimitiveSchema,
): ZodType | undefined {
  if (options.type === "string") {
    const { params } = options as { params: RVParams & RVStringParams };

    if (params?.format) return z.email();
    if (params?.pattern) z.regex(params.pattern as RegExp);

    let sSchema = null;

    if (params?.coerce) {
      sSchema = z.coerce.string();
    } else {
      sSchema = z.string();
    }

    if (params?.min) sSchema.min(params.min);
    if (params?.max) sSchema.max(params.max);

    if (params?.description) sSchema.describe(params.description);

    return sSchema;
  }

  if (options.type === "number") {
    const { params } = options as { params: RVNumberParams };

    let nSchema = null;

    if (params?.coerce) {
      nSchema = z.coerce.number();
    } else {
      nSchema = z.number();
    }

    if (params?.min) nSchema.min(params.min);
    if (params?.max) nSchema.max(params.max);
    if (params?.description) nSchema.describe(params.description);

    return nSchema;
  }

  if (options.type === "boolean") {
    const { params } = options as { params: RVBooleanParams };

    let bSchema = null;

    if (params?.coerce) {
      bSchema = z.coerce.boolean();
    } else {
      bSchema = z.boolean();
    }

    return bSchema;
  }

  if (options.type === "date") {
    const { params } = options as { params: RVDateParams };

    let dSchema = null;

    if (params?.coerce) {
      dSchema = z.coerce.date();
    } else {
      dSchema = z.date();
    }

    return dSchema;
  }

  if (options.type === "array") {
    return z.array(
      resolverPrimitiveSchema(options.schema as PrimitiveSchema) as ZodArray,
    );
  }

  if (options.type === "tuple") {
    const tupleResolved = options.schemas
      ?.map((schema) => resolverPrimitiveSchema(schema as PrimitiveSchema))
      .filter(Boolean);

    return z.tuple(
      tupleResolved as unknown as [z.core.SomeType, ...z.core.SomeType[]],
    );
  }

  if (options.type === "object") {
    return resolverObjectSchema(
      options as unknown as ResolverObjectSchema,
    ) as ZodObject;
  }
}

function resolverObjectSchema(opts: ResolverObjectSchema) {
  const resolvedZod: { [key: string]: ZodType } = {};

  const primitiveSchema = opts.schema;

  for (const key in primitiveSchema) {
    const value = primitiveSchema[key];

    if (["optional", "nullable"].includes(value.type)) {
      const type = value.type as "optional" | "nullable";

      const resolveOptional = resolverPrimitiveSchema(
        value.schema as PrimitiveSchema,
      ) as ZodType;

      resolvedZod[key] = resolveOptional[type]();
      continue;
    }

    if (value.type === "or" && value.schemas) {
      const firstSchema = resolverPrimitiveSchema(
        value.schemas[0] as PrimitiveSchema,
      ) as ZodType;

      const secondSchema = resolverPrimitiveSchema(
        value.schemas[1] as PrimitiveSchema,
      ) as ZodType;

      resolvedZod[key] = z.union([firstSchema, secondSchema]);
      continue;
    }

    resolvedZod[key] = resolverPrimitiveSchema(value) as ZodType;
  }

  return z.object(resolvedZod) as ZodObject;
}

export function resolver(schema: RVSchema): ZodType | ZodObject {
  if (isObject(schema)) {
    return resolverObjectSchema(schema as ResolverObjectSchema);
  }

  return resolverPrimitiveSchema(schema as PrimitiveSchema) as ZodType;
}
