import type { Highlights } from '@/entities/highlights/model/types/highlights.type';
import { getFirstJsonObject } from '../utils/getFirstJsonObject';
import { InvalidServerResponseError } from '@/shared/errors';
import { convertHighlightsToArray } from './convertHighlightsToArray';
import { validateServerResponse } from './validateServerResponse';
import type { AnalysisHighlight } from '@/entities/highlights/model/types/highlight.type';

export const transformAnalysisData = (
	value: Uint8Array
): {
	highlights: Highlights;
	highlightsToStore: AnalysisHighlight[];
} => {
	const rawData = getFirstJsonObject(value);

	if (!validateServerResponse(rawData)) {
		throw new InvalidServerResponseError(
			'Файл не был корректно обработан на сервере :('
		);
	}

	const { rows_affected: rows_affected, ...highlights } = rawData;

	void rows_affected;

	const highlightsToStore = convertHighlightsToArray(
		highlights as Highlights
	);

	return { highlights: highlights as Highlights, highlightsToStore };
};
