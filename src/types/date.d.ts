import type { RVSchema } from './schema';

export interface RVDate extends RVSchema {
	rv_type: 'date';
	rv_infer: Date;
}
