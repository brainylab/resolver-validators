import type { RVSchema } from './schema';
import type { InferTypes } from './infer-types';

type RVTupleInfer<
	T extends RVSchema[],
	P extends unknown[],
	Acc extends unknown[] = [],
> = T extends [infer L extends RVSchema, ...infer R extends RVSchema[]]
	? RVTupleInfer<R, P, [...Acc, InferTypes<L, P>]>
	: Acc;

export interface RVTuple<T> extends RVSchema {
	type: 'tuple';
	infer: RVTupleInfer<T, this['params']>;
}
