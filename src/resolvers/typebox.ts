import {
  type SchemaOptions,
  type TArray,
  type TObject,
  type TSchema,
  Type,
} from "@sinclair/typebox";

import type { RVParams, RVSchema, RVTypes } from "../types";

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

function resolveParams<P extends Record<string, string>>(params?: RVParams) {
  const typeBoxParams: SchemaOptions = {};

  const keys: { [key: string]: string } = {
    min: "minLength",
    max: "maxLength",
    format: "format",
    pattern: "pattern",
    description: "description",
  };

  if (params) {
    for (const key in keys) {
      const mappedKey = keys[key as keyof typeof keys] as keyof P;

      if (params[key as keyof RVParams] !== undefined) {
        typeBoxParams[mappedKey as string] = params[key as keyof RVParams];
      }
    }
  }

  return typeBoxParams;
}

/**
 * resolve schema
 */
function resolverPrimitiveSchema(
  options: PrimitiveSchema,
): TSchema | undefined {
  if (options.type === "string") {
    return Type.String(resolveParams(options.params));
  }

  if (options.type === "number") {
    return Type.Number(resolveParams(options.params));
  }

  if (options.type === "boolean") {
    return Type.Boolean();
  }

  if (options.type === "date") {
    return Type.Date();
  }

  if (options.type === "array") {
    return Type.Array(
      resolverPrimitiveSchema(options.schema as PrimitiveSchema) as TArray,
    );
  }

  if (options.type === "tuple") {
    const tuplePrimitiveResolved = options.schemas?.map((schema) =>
      resolverPrimitiveSchema(schema as PrimitiveSchema),
    );
    return Type.Tuple(tuplePrimitiveResolved as TSchema[]);
  }

  if (options.type === "object") {
    return resolverObjectSchema(
      options as unknown as ResolverObjectSchema,
    ) as TObject;
  }

  if (options.type === "optional") {
    return Type.Optional(
      resolverPrimitiveSchema(options.schema as PrimitiveSchema) as TSchema,
    );
  }

  if (options.type === "nullable") {
    return Type.Null(
      resolverPrimitiveSchema(options.schema as PrimitiveSchema) as TSchema,
    );
  }

  if (options.type === "or") {
    return Type.Union(
      options.schemas?.map(
        (item) => resolverPrimitiveSchema(item as PrimitiveSchema) as TSchema,
      ) as TSchema[],
    );
  }
}

function resolverObjectSchema(schema: ResolverObjectSchema) {
  if (schema.type === "object") {
    const resolvedTypeBox = {} as TObject;

    const primitiveSchema = schema.schema;

    for (const key in primitiveSchema) {
      const value = primitiveSchema[key];

      if (value.type === "optional") {
        resolvedTypeBox[key] = resolverPrimitiveSchema(value);
        continue;
      }

      resolvedTypeBox[key] = Type.Required(
        resolverPrimitiveSchema(value as PrimitiveSchema) as TSchema,
        value.params,
      );
    }

    return Type.Object(resolvedTypeBox);
  }
}

export function resolver(schema: RVSchema) {
  if (isObject(schema)) {
    return resolverObjectSchema(schema as ResolverObjectSchema);
  }

  return resolverPrimitiveSchema(schema as PrimitiveSchema);
}
