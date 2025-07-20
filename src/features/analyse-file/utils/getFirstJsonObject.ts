export const getFirstJsonObject = (
	value: Uint8Array
): Record<string, string | number> => {
	const decoder = new TextDecoder();
	const textChunk = decoder.decode(value).split('\n')[0];
	return JSON.parse(textChunk);
};
