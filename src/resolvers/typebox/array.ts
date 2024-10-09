import { Type } from '@sinclair/typebox';

import type { RVSchema } from '@/types/schema';
import type { TArray } from '@sinclair/typebox';
import type { RVArray } from '@/types/array';

export function array<T extends RVSchema>(schema: T): RVArray<T> & TArray {
	const resolved = Type.Array(schema as unknown as TArray);

	return {
		rv_type: 'array',
		...resolved,
	} as never;
}
