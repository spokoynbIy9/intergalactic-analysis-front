import type { HistoryItemType } from './historyItem.type';

export interface IHistorySlice {
	history: HistoryItemType[];
	selectedItem: HistoryItemType | null;
	clearHistory: () => void;
	removeFromHistory: (id: string) => void;
	addToHistory: (item: HistoryItemType) => void;
	setSelectedItem: (item: HistoryItemType) => void;
	resetSelectedItem: () => void;
	updateHistoryFromStorage: () => void;
}
