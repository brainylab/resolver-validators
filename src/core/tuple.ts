import type { RVSchema } from '@/types/schema';
import type { RVTuple } from '@/types/tuple';

export function tuple<T extends RVSchema[]>(schemas: [...T]): RVTuple<T> {
	return {
		type: 'tuple',
		schemas,
	} as never;
}
