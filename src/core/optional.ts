import type { RVSchema } from '@/types/schema';
import type { RVOptional } from '@/types/optional';

export function optional<T extends RVSchema>(schema: T): RVOptional<T> {
	return {
		type: 'optional',
		schema,
		optional: true,
	} as never;
}
