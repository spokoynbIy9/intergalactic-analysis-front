import type { Highlights } from '@/entities/highlights/model/types/highlights.type';

export type HistoryItemType = {
	id: string;
	timestamp: number;
	fileName: string;
	highlights?: Highlights;
};
