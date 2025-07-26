import type { HistoryItemType } from '@/features/history/model/types/historyItem.type';
import type { FC } from 'react';
import styles from './HistoryItem.module.css';
import cn from 'classnames';
import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/Typography';
import { formatDate } from '@/shared/helpers';
import { File, Trash } from '@/shared/assets/icons/iconsName';
import { FileStatus } from '../FileStatus/FileStatus';

type HistoryItemProps = {
	item: HistoryItemType;
	onClick: (item: HistoryItemType) => void;
	onDelete: (id: string) => void;
};

export const HistoryItem: FC<HistoryItemProps> = ({
	item,
	onClick,
	onDelete,
}) => {
	const { timestamp, id, fileName, highlights } = item;

	const date = formatDate(timestamp);

	const hasHighlights = Boolean(highlights);

	const handleDeleteButtonClick = () => {
		onDelete(id);
	};

	const handleItemClick = () => {
		if (!hasHighlights) {
			return;
		}

		onClick(item);
	};

	return (
		<div className={styles.root} data-testid="history-item">
			<Button
				type="button"
				variant="secondary"
				className={cn(styles.item, {
					[styles.disabled]: !hasHighlights,
				})}
				aria-label={`Открыть хайлайты для ${fileName}`}
				onClick={handleItemClick}
			>
				<div className={styles.fileName}>
					<File size={40} className={styles.icon} />
					<Typography maxRowsNumber={1}>{fileName}</Typography>
				</div>
				<Typography>{date}</Typography>
				<FileStatus type="success" isActive={hasHighlights} />
				<FileStatus type="error" isActive={!hasHighlights} />
			</Button>
			<Button
				type="button"
				variant="clear"
				className={styles.deleteButton}
				aria-label={`Удалить файл ${fileName}`}
				onClick={handleDeleteButtonClick}
				data-testid="history-item-delete-button"
			>
				<Trash size={33} />
			</Button>
		</div>
	);
};
