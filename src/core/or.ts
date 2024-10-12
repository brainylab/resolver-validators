import type { RVOr } from '@/types/or';
import type { RVSchema } from '@/types/schema';

export function or<T extends RVSchema[]>(...schemas: [...T]): RVOr<T> {
	return {
		type: 'or',
		schemas,
	} as never;
}
