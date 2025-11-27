import { Type } from '@sinclair/typebox';

import type { TSchema, TUnion } from '@sinclair/typebox';

export function TBUnion(schemas: TSchema[]): TUnion<TSchema[]> {
	return Type.Union(schemas);
}
