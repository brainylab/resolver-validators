import type { RVSchema } from './schema';
import type { InferTypes } from './infer-types';
import type { CreateInfer } from './helpers';
import type { RVOptional } from './optional';

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
	R extends Record<keyof any, unknown>,
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
export type RVProperties = Record<RVPropertyKey, InferTypes>;

export interface RVObject<T extends RVProperties = RVProperties>
	extends RVSchema {
	type: 'object';
	infer: ObjectInfer<T, this['params']>;
}
