import type { StateCreator } from 'zustand';
import type { AnalysisState } from '../../types/analysisState.type';
import type { IFileSlice } from '../../types/fileSlice.types';

type FileSliceCreator = StateCreator<
	AnalysisState,
	[['zustand/devtools', never]],
	[],
	IFileSlice
>;

export const createFileSlice: FileSliceCreator = (set) => ({
	file: null,
	status: 'idle',
	setFile: (file: File | null) =>
		set(
			{ file, status: 'idle', highlights: [], error: null },
			false,
			'file/setFile'
		),
	setStatus: (status: IFileSlice['status']) =>
		set({ status }, false, 'file/setStatus'),
});
