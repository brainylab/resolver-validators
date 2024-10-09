import type { RVSchema } from './schema';

export interface RVOptional<T> extends RVSchema {
	type: T extends { type: infer U } ? U : never;
	infer: T extends { infer: infer U } ? U : never;
	optional: true;
}
