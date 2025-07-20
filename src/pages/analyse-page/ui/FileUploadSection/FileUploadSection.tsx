import { Button } from '@/shared/ui/Button';
import { Dropzone } from '../Dropzone';
import type { FC } from 'react';
import type { AnalysisStatus } from '@/features/analyse-file/model/types/analysisSlice.types';
import styles from './FileUploadSection.module.css';

interface FileUploadSection {
	file: File | null;
	status: AnalysisStatus;
	error: string | null;

	onFileSelect: (file: File) => void;
	onSend: () => void;
	onClear: () => void;
}

export const FileUploadSection: FC<FileUploadSection> = ({
	file,
	status,
	error,
	onFileSelect,
	onSend,
	onClear,
}) => {
	const isProcessing = status === 'processing';
	const showSendButton =
		!isProcessing && status !== 'completed' && status !== 'error';

	return (
		<>
			<Dropzone
				file={file}
				status={status}
				error={error}
				onFileSelect={onFileSelect}
				onClear={onClear}
			/>
			{showSendButton && (
				<Button
					type="button"
					variant={'primary'}
					disabled={!file}
					onClick={onSend}
					className={styles.sendButton}
				>
					Отправить
				</Button>
			)}
		</>
	);
};
