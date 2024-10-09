import type { RVSchema } from './schema';
import type { RVParams } from './params';

export type RVNumberParams = RVParams & {};

export interface RVNumber extends RVSchema {
	rv_type: 'number';
	rv_infer: number;
}
