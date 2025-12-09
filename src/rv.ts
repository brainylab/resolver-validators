import type {
  RVArray,
  RVBoolean,
  RVBooleanParams,
  RVDate,
  RVDateParams,
  RVNullable,
  RVNumber,
  RVNumberParams,
  RVObject,
  RVOptional,
  RVOr,
  RVProperties,
  RVSchema,
  RVString,
  RVStringParams,
  RVTuple,
} from "./types";

export function array<T extends RVSchema>(schema: T): RVArray<T> {
  return {
    type: "array",
    schema,
  } as never;
}

export function boolean(params?: RVBooleanParams): RVBoolean {
  return {
    type: "boolean",
    params,
  } as never;
}

export function tuple<T extends RVSchema[]>(schemas: [...T]): RVTuple<T> {
  return {
    type: "tuple",
    schemas,
  } as never;
}

export function string(params?: RVStringParams): RVString {
  return {
    type: "string",
    params,
  } as never;
}

export function or<A extends RVSchema, B extends RVSchema>(
  a: A,
  b: B,
): RVOr<[A, B]> {
  return {
    type: "or",
    schemas: [a, b],
  } as never;
}

export function optional<T extends RVSchema>(schema: T): RVOptional<T> {
  return {
    type: "optional",
    schema,
    optional: true,
  } as never;
}

export function object<T extends RVProperties>(schema: T): RVObject<T> {
  return {
    type: "object",
    schema,
  } as never;
}

export function number(params?: RVNumberParams): RVNumber {
  return {
    type: "number",
    params,
  } as never;
}

export function nullable<T extends RVSchema>(schema: T): RVNullable<T> {
  return {
    type: "nullable",
    schema,
  } as never;
}

export function date(params?: RVDateParams): RVDate {
  return {
    type: "date",
    params,
  } as never;
}
