import type { StateCreator } from 'zustand';
import type { HistoryState } from '../../types/historyState.type';
import type { IHistorySlice } from '../../types/historySlice.type';
import { getHistory } from '@/features/history/lib/historyStorage';
import type { HistoryItemType } from '../../types/historyItem.type';

type HistorySliceCreator = StateCreator<
	HistoryState,
	[['zustand/devtools', never]],
	[],
	IHistorySlice
>;

export const createHistorySlice: HistorySliceCreator = (set) => ({
	history: getHistory(),
	selectedItem: null,
	clearHistory: () => set({ history: [] }, false, 'history/clearHistory'),
	removeFromHistory: (id: string) =>
		set(
			(state) => ({
				history: state.history.filter((item) => item.id !== id),
			}),
			false,
			'history/removeFromHistory'
		),
	addToHistory: (item: HistoryItemType) =>
		set(
			(state) => ({
				history: [...state.history, item],
			}),
			false,
			'history/addToHistory'
		),
	setSelectedItem: (item: HistoryItemType) =>
		set({ selectedItem: item }, false, 'history/setSelectedItem'),
	resetSelectedItem: () =>
		set({ selectedItem: null }, false, 'history/resetSelectedItem'),
	updateHistoryFromStorage: () =>
		set(
			{ history: getHistory() },
			false,
			'history/updateHistoryFromStorage'
		),
});
