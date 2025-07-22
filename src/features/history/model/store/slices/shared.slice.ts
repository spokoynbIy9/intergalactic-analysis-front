import type { StateCreator } from 'zustand';
import type { HistoryState } from '../../types/historyState.type';
import type { ISharedSlice } from '../../types/sharedSlice.type';

type SharedSliceCreator = StateCreator<
	HistoryState,
	[['zustand/devtools', never]],
	[],
	ISharedSlice
>;

export const createSharedSlice: SharedSliceCreator = (set) => ({
	reset: () =>
		set(
			{
				selectedItem: null,
				isOpenModal: false,
				history: [],
			},
			false,
			'shared/reset'
		),
});
