import type { RVSchema } from './schema';
import type { InferTypes } from './infer-types';
import type { VerifyInfer } from './helpers';

type ArrayStatic<T extends RVSchema, P extends unknown[]> = VerifyInfer<
	InferTypes<T, P>[]
>;

export interface RVArray<T> extends RVSchema {
	type: 'array';
	infer: ArrayStatic<T, this['params']>;
}
