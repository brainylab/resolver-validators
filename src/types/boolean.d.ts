import type { RVSchema } from './schema';

export interface RVBoolean extends RVSchema {
	rv_type: 'boolean';
	rv_infer: boolean;
}
