import { Type } from '@sinclair/typebox';

import type { TSchema, TTuple } from '@sinclair/typebox';

export function TBTuple(schemas: TSchema[]): TTuple {
	return Type.Tuple(schemas);
}
