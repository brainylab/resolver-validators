import type { RVSchema } from '@/types/schema';
import type { RVArray } from '@/types/array';

export function array<T extends RVSchema>(schema: T): RVArray<T> {
	return {
		type: 'array',
		schema,
	} as never;
}
