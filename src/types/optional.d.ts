import type { RVSchema } from './schema';

export interface RVOptional<T> extends RVSchema {
	rv_type: T extends { rv_type: infer U } ? U : never;
	rv_infer: T extends { rv_infer: infer U } ? U : never;
	rv_optional: true;
}
