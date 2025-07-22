import { create, type StateCreator } from 'zustand';
import type { HistoryState } from '../types/historyState.type';
import { devtools } from 'zustand/middleware';
import { createHistorySlice } from './slices/history.slice';
import { createModalSlice } from './slices/modal.slice';
import { createSharedSlice } from './slices/shared.slice';

const withMiddlewares = (
	config: StateCreator<
		HistoryState,
		[['zustand/devtools', never]],
		[],
		HistoryState
	>
) => {
	return devtools(config, {
		name: 'HistoryStore',
	});
};

export const useHistoryStore = create<HistoryState>()(
	withMiddlewares((...a) => ({
		...createHistorySlice(...a),
		...createModalSlice(...a),
		...createSharedSlice(...a),
	}))
);
