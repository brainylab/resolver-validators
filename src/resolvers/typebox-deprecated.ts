import {
  type NumberOptions,
  type StringOptions,
  type TArray,
  type TBoolean,
  type TDate,
  type TNull,
  type TNumber,
  type TObject,
  type TSchema,
  type TString,
  type TTuple,
  type TUnion,
  Type,
} from "@sinclair/typebox";

import type {
  RVNumberParams,
  RVParams,
  RVSchema,
  RVStringParams,
  RVTypes,
} from "@/types";

import { isObject } from "../utils";

function TBString(params?: RVStringParams): TString {
  const typeBoxParams: StringOptions = {};

  const keys: { [key in keyof RVStringParams]: string } = {
    min: "minLength",
    max: "maxLength",
    format: "format",
    pattern: "pattern",
    description: "description",
  };

  if (params) {
    for (const key in keys) {
      const mappedKey = keys[key as keyof typeof keys] as keyof RVStringParams;
      if (params[key as keyof RVStringParams] !== undefined) {
        typeBoxParams[mappedKey] = params[key as keyof RVStringParams];
      }
    }
  }

  return Type.String(typeBoxParams);
}

function TBTuple(schemas: TSchema[]): TTuple {
  return Type.Tuple(schemas);
}

function TBUnion(schemas: TSchema[]): TUnion<TSchema[]> {
  return Type.Union(schemas);
}

function TBArray(schema: TArray): TArray {
  return Type.Array(schema);
}

function TBBoolean(): TBoolean {
  return Type.Boolean();
}

function TBDate(): TDate {
  return Type.Date();
}

function TBNullable(schema: TSchema): TNull {
  return Type.Null(schema);
}

function TBOptional(schema: TSchema): TSchema {
  return Type.Optional(schema as unknown as TSchema);
}

function TBNumber(params?: RVNumberParams): TNumber {
  const typeBoxParams: NumberOptions = {};

  const keys: { [key in keyof RVNumberParams]: string } = {
    min: "minLength",
    max: "maxLength",
    description: "description",
  };

  if (params) {
    for (const key in keys) {
      const mappedKey = keys[key as keyof typeof keys] as keyof RVNumberParams;
      if (params[key as keyof RVNumberParams] !== undefined) {
        typeBoxParams[mappedKey] = params[key as keyof RVNumberParams];
      }
    }
  }

  return Type.Number(typeBoxParams);
}

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

function resolverPrimitiveSchema(options: PrimitiveSchema): TSchema {
  if (options.type === "string") {
    return TBString(options.params);
  }

  if (options.type === "number") {
    return TBNumber(options.params);
  }

  if (options.type === "boolean") {
    return TBBoolean();
  }

  if (options.type === "date") {
    return TBDate();
  }

  if (options.type === "array") {
    return TBArray(
      resolverPrimitiveSchema(options.schema as PrimitiveSchema) as TArray,
    );
  }

  if (options.type === "tuple") {
    const tuplePrimitiveResolved = options.schemas?.map((schema) =>
      resolverPrimitiveSchema(schema as PrimitiveSchema),
    );
    return TBTuple(tuplePrimitiveResolved as TSchema[]);
  }

  if (options.type === "optional") {
    return TBOptional(
      resolverPrimitiveSchema(options.schema as PrimitiveSchema) as TSchema,
    );
  }

  if (options.type === "nullable") {
    return TBNullable(
      resolverPrimitiveSchema(options.schema as PrimitiveSchema) as TSchema,
    );
  }

  if (options.type === "or") {
    return TBUnion(
      options.schemas?.map(
        (item) => resolverPrimitiveSchema(item as PrimitiveSchema) as TSchema,
      ) as TSchema[],
    );
  }

  return resolverObjectSchema(
    options as unknown as ResolverObjectSchema,
  ) as TObject;
}

function resolverObjectSchema(schema: ResolverObjectSchema): TSchema {
  const resolvedTypeBox = {} as TObject;

  const primitiveSchema = schema.schema;

  for (const key in primitiveSchema) {
    const value = primitiveSchema[key];

    if (value.type === "optional") {
      resolvedTypeBox[key] = resolverPrimitiveSchema(value);
      continue;
    }

    resolvedTypeBox[key] = resolverPrimitiveSchema(value);
  }

  return Type.Object(resolvedTypeBox);
}

export function resolver(schema?: RVSchema): TSchema {
  if (!schema) return Type.Any();

  if (isObject(schema)) {
    return resolverObjectSchema(schema as ResolverObjectSchema);
  }

  return resolverPrimitiveSchema(schema as PrimitiveSchema);
}
