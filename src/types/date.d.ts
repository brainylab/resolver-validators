import type { RVSchema } from './schema';

export interface RVDate extends RVSchema {
	type: 'date';
	infer: Date;
}
