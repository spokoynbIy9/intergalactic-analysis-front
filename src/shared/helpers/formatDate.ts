export const formatDate = (timestamp: number | Date): string => {
	const date = timestamp instanceof Date ? timestamp : new Date(timestamp);

	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1, т.к. месяцы начинаются с 0
	const year = date.getFullYear();

	return `${day}.${month}.${year}`;
};
