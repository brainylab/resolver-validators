import { Type } from '@sinclair/typebox';

import type { NumberOptions, TNumber } from '@sinclair/typebox';
import type { RVNumberParams } from '@/types/number';

export function TBNumber(params?: RVNumberParams): TNumber {
	const typeBoxParams: NumberOptions = {};

	if (params?.min) {
		typeBoxParams.minLength = params.min;
	}

	if (params?.max) {
		typeBoxParams.maxLength = params.max;
	}

	return Type.Number(typeBoxParams);
}
