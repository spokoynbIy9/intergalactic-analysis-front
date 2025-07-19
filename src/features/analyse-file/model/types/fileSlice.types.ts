import type { AnalysisStatus } from './analysisSlice.types';

export interface IFileSlice {
	file: File | null;
	status: AnalysisStatus;
	setFile: (file: File | null) => void;
	setStatus: (status: AnalysisStatus) => void;
}
