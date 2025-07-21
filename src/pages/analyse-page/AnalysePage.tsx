import { Typography } from '@/shared/ui/Typography';
import { FileUploadSection } from './ui/FileUploadSection';
import styles from './AnalysePage.module.css';
import { useAnalysisStore } from '@/features/analyse-file/model/store';
import { useCsvAnalysis } from '@/features/analyse-file/lib/useCsvAnalysis';
import type { Highlights } from '@/entities/highlights/model/types/highlights.type';
import { addToHistory } from '@/features/analyse-file/lib/historyStorage';
import { HighlightsSection } from '@/entities/highlights/ui/HighlightsSection';

const AnalysePage = () => {
	const {
		file,
		highlights,
		setFile,
		status,
		reset,
		error,
		setError,
		setStatus,
		setHighlights,
	} = useAnalysisStore();

	const onComplete = (highlights?: Highlights) => {
		setStatus('completed');

		if (file) {
			addToHistory({ fileName: file.name, highlights });
		}
	};

	const onError = (error: Error) => {
		setError(error.message);
		setStatus('error');

		if (file) {
			addToHistory({ fileName: file.name });
		}
	};

	const { analyzeCsv } = useCsvAnalysis({
		onData: setHighlights,
		onComplete,
		onError,
	});

	const handleFileSelect = (selectedFile: File) => {
		setFile(selectedFile);
	};

	const handleSend = async () => {
		if (!file || status === 'processing') {
			return;
		}

		setStatus('processing');

		await analyzeCsv(file);
	};

	return (
		<div className={styles.container}>
			<Typography>
				Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о
				нём за сверхнизкое время
			</Typography>

			<FileUploadSection
				file={file}
				status={status}
				error={error}
				onFileSelect={handleFileSelect}
				onSend={handleSend}
				onClear={reset}
			/>

			<HighlightsSection highlights={highlights} />
		</div>
	);
};

export default AnalysePage;
