import type { RVSchema } from './schema';
import type { RVParams } from './params';

export type RVStringParams = RVParams & {
	format?: 'email';
	pattern?: string;
};

export interface RVString extends RVSchema {
	type: 'string';
	infer: string;
	params?: RVStringParams;
}
