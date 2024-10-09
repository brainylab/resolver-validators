import { Type, type TObject } from '@sinclair/typebox';

import type { RVObject, RVProperties } from '@/types/object';

export function object<T extends RVProperties>(
	schema: T,
): RVObject<T> & TObject {
	const resolved = Type.Object(schema);

	return {
		rv_type: 'object',
		...resolved,
	} as never;
}
