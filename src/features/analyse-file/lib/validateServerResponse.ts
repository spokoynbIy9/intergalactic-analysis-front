import { InvalidServerResponseError } from '@/shared/errors';
import { HIGHLIGHT_TITLES } from '../config/highlightTitles';

export const validateServerResponse = (
	rawData: Record<string, string | number>
) => {
	const validHighlightKeys = Object.keys(HIGHLIGHT_TITLES);
	const responseHighlightKeys = Object.keys(rawData);

	// Проверяем, что в ответе есть хотя бы один ожидаемый ключ
	const hasValidKeys = validHighlightKeys.some((key) =>
		responseHighlightKeys.includes(key)
	);
	if (!hasValidKeys) {
		return false;
	}

	// Проверяем, что нет null значений в полях ответа
	const hasNullValues = Object.values(rawData).some(
		(value) => value === null
	);
	if (hasNullValues) {
		throw new InvalidServerResponseError(
			'Ответ сервера содержит некорректные данные (null значения)'
		);
	}

	return true;
};
