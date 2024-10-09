import { Type } from '@sinclair/typebox';

import type { NumberOptions, TNumber } from '@sinclair/typebox';
import type { RVNumber, RVNumberParams } from '@/types/number';

export function number(params?: RVNumberParams): RVNumber & TNumber {
	const typeBoxParams: NumberOptions = {};

	if (params?.min) {
		typeBoxParams.minLength = params.min;
	}

	if (params?.max) {
		typeBoxParams.maxLength = params.max;
	}

	const resolved = Type.Number(typeBoxParams);

	return {
		rv_type: 'number',
		...resolved,
	} as never;
}
