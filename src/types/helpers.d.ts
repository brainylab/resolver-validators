export type CreateInfer<T> = T extends infer O
  ? { [K in keyof O]: O[K] }
  : never
export type VerifyInfer<T> = T extends infer U ? U : never

export type RVTypes =
  | "array"
  | "date"
  | "boolean"
  | "number"
  | "object"
  | "optional"
  | "nullable"
  | "required"
  | "or"
  | "string"
  | "tuple"
