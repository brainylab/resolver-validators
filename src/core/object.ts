import type { RVObject, RVProperties } from '@/types/object';

export function object<T extends RVProperties>(schema: T): RVObject<T> {
	return {
		type: 'object',
		schema,
	} as never;
}
