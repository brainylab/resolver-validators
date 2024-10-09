import type { RVNumber, RVNumberParams } from '@/types/number';

export function number(params?: RVNumberParams): RVNumber {
	return {
		type: 'number',
		params,
	} as never;
}
