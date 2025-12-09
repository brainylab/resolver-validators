export interface RVSchema {
  type: unknown;
  infer: unknown;
  schema: unknown;
  optional?: boolean;
}

export type RVParams = {
  min?: number;
  max?: number;
  description?: string;
};

export type CreateInfer<T> = T extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

export type VerifyInfer<T> = T extends infer U ? U : never;

export type RVTypes =
  | "array"
  | "date"
  | "boolean"
  | "number"
  | "object"
  | "optional"
  | "nullable"
  | "or"
  | "string"
  | "tuple";

export type InferTypes<T extends RVSchema, P extends unknown[] = []> = (T & {
  params: P;
})["infer"];

type ArrayStatic<T extends RVSchema, P extends unknown[]> = VerifyInfer<
  InferTypes<T, P>[]
>;

type RVArraySchema = RVSchema & { params: unknown[] };

export interface RVArray<T extends RVSchema> extends RVArraySchema {
  type: "array";
  infer: ArrayStatic<T, this["params"]>;
}

export type RVDateParams = { coerce?: boolean; default?: Date };

export interface RVDate extends RVSchema {
  type: "date";
  infer: Date;
  params?: RVDateParams;
}

export interface RVNullable<T extends RVSchema> extends RVSchema {
  type: "nullable";
  schema: T;
  infer: T extends { infer: infer U } ? U | null : null;
}

export type RVBooleanParams = { coerce?: boolean; default?: boolean };

export interface RVBoolean extends RVSchema {
  type: "boolean";
  infer: boolean;
  params?: RVBooleanParams;
}

export type RVStringParams = RVParams & {
  format?: "email";
  pattern?: string | RegExp;
  coerce?: boolean;
  default?: string;
};

export interface RVString extends RVSchema {
  type: "string";
  infer: string;
  params?: RVStringParams;
}

export interface RVOptional<T> extends RVSchema {
  type: T extends { type: infer U } ? U : never;
  infer: T extends { infer: infer U } ? U : never;
  optional: true;
}

export type RVNumberParams = RVParams & {
  coerce?: boolean;
  default?: number;
};

export interface RVNumber extends RVSchema {
  type: "number";
  infer: number;
  params?: RVNumberParams;
}

type RVTupleInfer<
  T extends RVSchema[],
  P extends unknown[],
  Acc extends unknown[] = [],
> = T extends [infer L extends RVSchema, ...infer R extends RVSchema[]]
  ? RVTupleInfer<R, P, [...Acc, InferTypes<L, P>]>
  : Acc;

type RVTupleSchema = RVSchema & { params: unknown[] };

export interface RVTuple<T extends RVSchema[]> extends RVTupleSchema {
  type: "tuple";
  infer: RVTupleInfer<T, this["params"]>;
}

export type RVReadonly<T extends RVSchema> = T & { readonly: true };
export type Evaluate<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

type OptionalPropertyKeys<T extends RVProperties> = {
  [K in keyof T]: T[K] extends RVOptional<RVSchema>
    ? T[K] extends RVReadonly<T[K]>
      ? never
      : K
    : never;
}[keyof T];

type RequiredPropertyKeys<T extends RVProperties> = keyof Omit<
  T,
  OptionalPropertyKeys<T>
>;

type ObjectInferProperties<
  T extends RVProperties,
  R extends Record<keyof T, unknown>,
> = CreateInfer<
  Partial<Pick<R, OptionalPropertyKeys<T>>> &
    Required<Pick<R, RequiredPropertyKeys<T>>>
>;

type ObjectInfer<
  T extends RVProperties,
  P extends unknown[],
> = ObjectInferProperties<
  T,
  {
    [K in keyof T]: InferTypes<T[K], P>;
  }
>;

export type RVPropertyKey = string | number;
export type RVProperties = Record<RVPropertyKey, RVSchema>;

type RVObjectSchema = RVSchema & {
  params: unknown[];
};

export interface RVObject<T extends RVProperties = RVProperties>
  extends RVObjectSchema {
  type: "object";
  infer: ObjectInfer<T, this["params"]>;
}

type RVUnionStatic<T extends RVSchema[], P extends unknown[]> = {
  [K in keyof T]: T[K] extends RVSchema ? InferTypes<T[K], P> : never;
}[number];

type RVUnionSchema = RVSchema & {
  params: unknown[];
};

interface RVUnion<T extends RVSchema[] = RVSchema[]> extends RVUnionSchema {
  infer: RVUnionStatic<T, this["params"]>;
}

interface RVNever extends RVSchema {
  infer: never;
}

export type RVOr<T extends RVSchema[]> = T extends []
  ? RVNever
  : T extends [RVSchema]
    ? T[0]
    : RVUnion<T>;
