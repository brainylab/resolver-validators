import { Type } from '@sinclair/typebox';

import type { TBoolean } from '@sinclair/typebox';
import type { RVBoolean } from '@/types/boolean';

export function boolean(): RVBoolean & TBoolean {
	const resolved = Type.Boolean();

	return {
		rv_type: 'boolean',
		resolved,
	} as never;
}
