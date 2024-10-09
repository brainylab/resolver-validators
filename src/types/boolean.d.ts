import type { RVSchema } from './schema';

export interface RVBoolean extends RVSchema {
	type: 'boolean';
	infer: boolean;
}
