import type { AnalysisHighlight } from '@/entities/highlights/model/types/highlight.type';
import { HighlightCard } from '@/entities/highlights/ui/HighlightCard';
import { convertHighlightsToArray } from '@/features/analyse-file/lib/convertHighlightsToArray';
import { useHistoryStore } from '@/features/history/model/store';
import { Modal } from '@/shared/ui/Modal/Modal';
import type { FC } from 'react';
import { useShallow } from 'zustand/shallow';
import styles from './HistoryModal.module.css';

export const HistoryModal: FC = () => {
	const { isOpenModal, selectedItem, hideModal } = useHistoryStore(
		useShallow((state) => ({
			isOpenModal: state.isOpenModal,
			selectedItem: state.selectedItem,
			hideModal: state.hideModal,
		}))
	);

	if (!selectedItem?.highlights) {
		return null;
	}

	const hightlights: AnalysisHighlight[] = convertHighlightsToArray(
		selectedItem.highlights
	);

	return (
		<Modal
			isOpen={isOpenModal}
			onClose={hideModal}
			data-testid={'history-modal'}
		>
			<div className={styles.root}>
				<div className={styles.highlights}>
					{hightlights.map((highlight) => (
						<HighlightCard
							key={highlight.title}
							highlight={highlight}
							className={styles.hightlightCard}
						/>
					))}
				</div>
			</div>
		</Modal>
	);
};
