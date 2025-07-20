import type { Highlights } from '@/entities/highlights/model/types/highlights.type';
import { HIGHLIGHT_TITLES } from '../config/highlightTitles';
import type { AnalysisHighlight } from '@/entities/highlights/model/types/highlight.type';

export const convertHighlightsToArray = (
	highlights: Highlights
): AnalysisHighlight[] => {
	return Object.entries(highlights).map(([key, title]) => ({
		title:
			typeof title === 'number'
				? String(Math.round(title))
				: String(title),
		description: HIGHLIGHT_TITLES[key] ?? 'Неизвестный параметр',
	}));
};
