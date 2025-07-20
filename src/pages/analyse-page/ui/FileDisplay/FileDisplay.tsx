import type { FC } from 'react';
import styles from './FileDisplay.module.css';
import { Typography } from '@/shared/ui/Typography';
import cn from 'classnames';
import { Button } from '@/shared/ui/Button';
import { Clear } from '@/shared/assets/icons/iconsName';

interface FileDisplayProps {
	fileName: string;
	isCompleted: boolean;
	isProcessing: boolean;
	isError: boolean;
	onClear: () => void;
}

export const FileDisplay: FC<FileDisplayProps> = ({
	fileName,
	isCompleted,
	isProcessing,
	isError,
	onClear,
}) => {
	return (
		<div className={styles.fileControls}>
			<div className={styles.fileInfo}>
				<Typography
					className={cn(styles.fileName, {
						[styles.fileNameCompleted]: isCompleted,
						[styles.fileNameError]: isError,
					})}
				>
					{fileName}
				</Typography>
			</div>
			<Button
				type="button"
				variant="clear"
				className={cn(styles.clearFileButton, styles.customBorder)}
				onClick={onClear}
				disabled={isProcessing}
			>
				<Clear size={22} />
			</Button>
		</div>
	);
};
