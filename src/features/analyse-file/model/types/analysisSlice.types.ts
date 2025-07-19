export type AnalysisStatus = 'idle' | 'processing' | 'completed' | 'error';

export interface AnalysisHighlight {
	title: string;
	description: string;
}

export interface IAnalysisSlice {
	highlights: AnalysisHighlight[];
	error: string | null;
	setHighlights: (highlights: AnalysisHighlight[]) => void;
	setError: (error: string | null) => void;
}
