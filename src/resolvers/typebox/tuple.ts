import { Type } from '@sinclair/typebox';

import type { RVSchema } from '@/types/schema';
import type { TTuple } from '@sinclair/typebox';
import type { RVTuple } from '@/types/tuple';

export function tuple<T extends RVSchema[]>(
	schemas: [...T],
): RVTuple<T> & TTuple {
	const resolved = Type.Array(schemas as unknown as TTuple);

	return {
		rv_type: 'array',
		...resolved,
	} as never;
}
