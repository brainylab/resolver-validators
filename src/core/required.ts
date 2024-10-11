import type { RVRequired, RVRequiredParams } from '@/types/required';
import type { RVSchema } from '@/types/schema';

export function required<T extends RVSchema>(
	schema: T,
	params?: RVRequiredParams,
): RVRequired<T> {
	return {
		type: 'required',
		schema,
		params,
		required: true,
	} as never;
}
