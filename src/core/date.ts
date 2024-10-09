import type { RVDate } from '@/types/date';

export function date(): RVDate {
	return {
		type: 'date',
	} as never;
}
