import type { RVSchema } from './schema';
import type { InferTypes } from './infer-types';

type RVUnionStatic<T extends RVSchema[], P extends unknown[]> = {
	[K in keyof T]: T[K] extends RVSchema ? InferTypes<T[K], P> : never;
}[number];

interface RVUnion<T extends RVSchema[] = RVSchema[]> extends RVSchema {
	infer: RVUnionStatic<T, this['params']>;
}

interface RVNever extends RVSchema {
	infer: never;
}

export type RVOr<T extends RVSchema[]> = T extends []
	? RVNever
	: T extends [RVSchema]
		? T[0]
		: RVUnion<T>;
