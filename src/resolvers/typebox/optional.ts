import { Type } from '@sinclair/typebox';

import type { RVSchema } from '@/types/schema';
import type { TSchema } from '@sinclair/typebox';
import type { RVOptional } from '@/types/optional';

export function optional<T extends RVSchema>(
	schema: T,
): RVOptional<T> & TSchema {
	const resolved = Type.Optional(schema as unknown as TSchema);

	return {
		rv_type: 'optional',
		rv_optional: true,
		...resolved,
	} as never;
}
