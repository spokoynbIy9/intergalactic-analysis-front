import { create, type StateCreator } from 'zustand';
import type { AnalysisState } from '../types/analysisState.type';
import { createAnalysisSlice } from './slices/analysis.slice';
import { devtools } from 'zustand/middleware';
import { createFileSlice } from './slices/file.slice';
import { createSharedSlice } from './slices/shared.slice';

const withMiddlewares = (
	config: StateCreator<
		AnalysisState,
		[['zustand/devtools', never]],
		[],
		AnalysisState
	>
) => {
	return devtools(config, {
		name: 'AnalysisStore',
	});
};

export const useAnalysisStore = create<AnalysisState>()(
	withMiddlewares((...a) => ({
		...createAnalysisSlice(...a),
		...createFileSlice(...a),
		...createSharedSlice(...a),
	}))
);
