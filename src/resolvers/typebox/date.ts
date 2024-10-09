import { Type } from '@sinclair/typebox';

import type { RVDate } from '@/types/date';
import type { TDate } from '@sinclair/typebox';

export function date(): RVDate & TDate {
	const resolved = Type.Date();

	return {
		rv_type: 'date',
		resolved,
	} as never;
}
