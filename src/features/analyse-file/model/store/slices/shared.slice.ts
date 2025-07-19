import type { StateCreator } from 'zustand';
import type { AnalysisState } from '../../types/analysisState.type';
import type { ISharedSlice } from '../../types/sharedSlice.types';

type SharedSliceCreator = StateCreator<
	AnalysisState,
	[['zustand/devtools', never]],
	[],
	ISharedSlice
>;

export const createSharedSlice: SharedSliceCreator = (set) => ({
	reset: () => {
		set(
			{
				file: null,
				status: 'idle',
				highlights: [],
				error: null,
			},
			false,
			'store/reset'
		);
	},
});
