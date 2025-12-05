import {
  type TArray,
  type TObject,
  type TProperties,
  type TSchema,
  type TSchemaOptions,
  Type,
} from "typebox";

import type { RVParams, RVSchema, RVTypes } from "../types";

import { isObject } from "../utils";
import { TBDate } from "./typebox-helpers";

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
  const typeBoxParams: TSchemaOptions = {};

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
function resolverPrimitiveSchema(options: PrimitiveSchema): TSchema {
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
    return TBDate();
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

  if (options.type === "optional") {
    return Type.Optional(
      resolverPrimitiveSchema(options.schema as PrimitiveSchema) as TSchema,
    );
  }

  if (options.type === "nullable") {
    return Type.Union([
      resolverPrimitiveSchema(options.schema as PrimitiveSchema) as TSchema,
      Type.Null(),
    ]);
  }

  if (options.type === "or") {
    return Type.Union(
      options.schemas?.map(
        (item) => resolverPrimitiveSchema(item as PrimitiveSchema) as TSchema,
      ) as TSchema[],
    );
  }

  return resolverObjectSchema(
    options as unknown as ResolverObjectSchema,
  ) as TObject;
}

function resolverObjectSchema(schema: ResolverObjectSchema) {
  if (schema.type === "object") {
    const resolvedTypebox: TProperties = {} as TProperties;

    const primitiveSchema = schema.schema;

    for (const key in primitiveSchema) {
      const value = primitiveSchema[key];

      if (value.type === "optional") {
        resolvedTypebox[key] = resolverPrimitiveSchema(value);
        continue;
      }

      resolvedTypebox[key] = resolverPrimitiveSchema(
        value as PrimitiveSchema,
      ) as TSchema;
    }

    return Type.Object(resolvedTypebox);
  }
}

export function resolver(schema?: RVSchema): TSchema {
  if (!schema) return Type.Any();

  if (isObject(schema)) {
    console.log("aqui 3");
    return resolverObjectSchema(schema as ResolverObjectSchema) as TSchema;
  }

  return resolverPrimitiveSchema(schema as PrimitiveSchema);
}
