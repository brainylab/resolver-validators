import { Type } from '@sinclair/typebox';

import type { StringOptions, TString } from '@sinclair/typebox';
import type { RVStringParams } from '@/types/string';

export function TBString(params?: RVStringParams): TString {
	const typeBoxParams: StringOptions = {};

	if (params?.min) {
		typeBoxParams.minLength = params.min;
	}

	if (params?.max) {
		typeBoxParams.maxLength = params.max;
	}

	if (params?.format) {
		typeBoxParams.format = params.format;
	}

	if (params?.regex) {
		typeBoxParams.format = 'regex';
		typeBoxParams.pattern = params.regex;
	}

	return Type.String(typeBoxParams);
}
