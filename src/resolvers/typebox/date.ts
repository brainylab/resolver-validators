import { Type } from '@sinclair/typebox';

import type { TDate } from '@sinclair/typebox';

export function TBDate(): TDate {
	return Type.Date();
}
