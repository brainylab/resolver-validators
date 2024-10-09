import type { RVSchema } from './schema';
import type { RVParams } from './params';

export type RVStringParams = RVParams & {
	format?: 'email';
	regex?: string;
};

export interface RVString extends RVSchema {
	rv_type: 'string';
	rv_infer: string;
}
