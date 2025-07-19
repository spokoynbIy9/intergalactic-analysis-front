export const isCsvFile = (file: File): boolean => {
	return file.name.toLowerCase().endsWith('.csv');
};
