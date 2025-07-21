import type { AnalysisHighlight } from '@/entities/highlights/model/types/highlight.type';

export type AnalysisStatus = 'idle' | 'processing' | 'completed' | 'error';

export interface IAnalysisSlice {
	highlights: AnalysisHighlight[];
	error: string | null;
	setHighlights: (highlights: AnalysisHighlight[]) => void;
	setError: (error: string | null) => void;
}
