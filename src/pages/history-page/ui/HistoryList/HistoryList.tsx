import { removeFromHistory } from '@/features/history/lib/historyStorage';
import { useHistoryStore } from '@/features/history/model/store';
import type { HistoryItemType } from '@/features/history/model/types/historyItem.type';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

import styles from './HistoryList.module.css';
import { HistoryItem } from '../HistoryItem';

export const HistoryList = () => {
	const {
		history,
		showModal,
		setSelectedItem,
		removeFromHistoryStore,
		updateHistoryFromStorage,
	} = useHistoryStore(
		useShallow((state) => ({
			showModal: state.showModal,
			setSelectedItem: state.setSelectedItem,
			removeFromHistoryStore: state.removeFromHistory,
			history: state.history,
			updateHistoryFromStorage: state.updateHistoryFromStorage,
		}))
	);

	useEffect(() => {
		updateHistoryFromStorage();
	}, [updateHistoryFromStorage]);

	const handleItemClick = (item: HistoryItemType) => {
		setSelectedItem(item);
		showModal();
	};

	const handleDeleteItem = (id: string) => {
		removeFromHistory(id);
		removeFromHistoryStore(id);
	};

	return (
		<div className={styles.list}>
			{history.map((item) => (
				<HistoryItem
					key={item.id}
					item={item}
					onClick={handleItemClick}
					onDelete={handleDeleteItem}
				/>
			))}
		</div>
	);
};
