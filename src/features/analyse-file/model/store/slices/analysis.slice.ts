import type { StateCreator } from 'zustand';
import type { AnalysisState } from '../../types/analysisState.type';
import type { IAnalysisSlice } from '../../types/analysisSlice.types';

// StateCreate<type всего стора, middlware, пользовательские set/get, type возвращаемого слайса>
type AnalysisSliceCreator = StateCreator<
	AnalysisState,
	[['zustand/devtools', never]],
	[],
	IAnalysisSlice
>;

export const createAnalysisSlice: AnalysisSliceCreator = (set) => ({
	highlights: [],
	error: null,
	setHighlights: (highlights: IAnalysisSlice['highlights']) =>
		set({ highlights }, false, 'analysis/setHighlights'),
	setError: (error: string | null) =>
		set({ error }, false, 'analysis/setError'),
});
