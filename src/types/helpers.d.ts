export type CreateInfer<T> = T extends infer O
	? { [K in keyof O]: O[K] }
	: never;
export type VerifyInfer<T> = T extends infer U ? U : never;
