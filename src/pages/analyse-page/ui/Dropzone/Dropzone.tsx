import cn from 'classnames';

import styles from './Dropzone.module.css';
import { useCallback, useRef, useState, type FC } from 'react';
import type { AnalysisStatus } from '@/features/analyse-file/model/types/analysisSlice.types';
import { isCsvFile } from '@/shared/lib/file/isCsvFile';
import { FileDisplay } from '../FileDisplay';
import { Loader } from '@/shared/ui/Loader';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';

interface DropzoneProps {
	file: File | null;
	status: AnalysisStatus;
	error: string | null;

	onFileSelect: (file: File) => void;
	onClear: () => void;
}

export const Dropzone: FC<DropzoneProps> = ({
	file,
	error,
	status,
	onFileSelect,
	onClear,
}) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const [isDragActive, setIsDragActive] = useState(false);
	const [validationError, setValidationError] = useState<string | null>(null);

	const isProcessing = status === 'processing';
	const isError = Boolean(error) || Boolean(validationError);

	const handleDragEnter = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();

			if (isProcessing) {
				return;
			}

			setIsDragActive(true);
			setValidationError(null);
		},
		[isProcessing]
	);

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDragLeave = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();

			if (e.currentTarget.contains(e.relatedTarget as Node)) return;
			setIsDragActive(false);
		},
		[]
	);

	const handleFileSelect = useCallback(
		(selectedFile: File) => {
			if (!isCsvFile(selectedFile)) {
				setValidationError('Можно загружать только *.csv файлы');
				return;
			}

			setValidationError(null);
			onFileSelect(selectedFile);
		},
		[onFileSelect]
	);

	const handleDrop = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();

			setIsDragActive(false);

			if (isProcessing) {
				return;
			}

			const droppedFile = e.dataTransfer.files?.[0];

			if (droppedFile) {
				handleFileSelect(droppedFile);
			}
		},
		[isProcessing, handleFileSelect]
	);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const selectedFile = e.target.files?.[0];

			if (selectedFile) {
				handleFileSelect(selectedFile);
				e.target.value = '';
			}
		},
		[handleFileSelect]
	);

	const handleUploadClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			setValidationError(null);
			inputRef.current?.click();
		},
		[]
	);

	const handleZoneClick = useCallback(() => {
		if (!file && !isProcessing) {
			setValidationError(null);
			inputRef.current?.click();
		}
	}, [file, isProcessing]);

	const renderContent = () => {
		if (isProcessing) {
			return (
				<div className={styles.fileProcessing}>
					<Loader />
				</div>
			);
		}

		if (file) {
			return (
				<FileDisplay
					fileName={file.name}
					onClear={onClear}
					isError={isError}
					isCompleted={status === 'completed'}
					isProcessing={isProcessing}
				/>
			);
		}

		return (
			<Button
				type="button"
				variant="upload"
				onClick={handleUploadClick}
				disabled={isProcessing}
			>
				Загрузить файл
			</Button>
		);
	};

	const renderStatusText = () => {
		if (validationError) {
			return (
				<Typography color="validation-error">
					{validationError}
				</Typography>
			);
		}
		if (isProcessing) {
			return <Typography size="l">идёт парсинг файла</Typography>;
		}
		if (status === 'completed') {
			return <Typography size="l">готово!</Typography>;
		}
		if (error) {
			return (
				<Typography color="error" size="l">
					упс, не то...
				</Typography>
			);
		}
		if (file) {
			return <Typography size="l">файл загружен!</Typography>;
		}
		if (isDragActive) {
			return <Typography size="l">Отпустите для загрузки'</Typography>;
		}
		return <Typography size="l">или перетащите сюда .csv файл</Typography>;
	};

	return (
		<div
			className={cn(styles.dropzone, {
				[styles.dragActive]: isDragActive,
				[styles.dragValidationError]: validationError,
				[styles.dragError]: error,
			})}
			onDragEnter={handleDragEnter}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			onClick={handleZoneClick}
		>
			<input
				type="file"
				accept=".csv"
				ref={inputRef}
				onChange={handleInputChange}
				hidden
			/>

			{renderContent()}

			<>{renderStatusText()}</>
		</div>
	);
};
