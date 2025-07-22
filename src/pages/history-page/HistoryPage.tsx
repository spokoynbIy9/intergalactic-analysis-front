import styles from './HistoryPage.module.css';
import { ClearHistoryButton } from './ui/ClearHistoryButton';
import { GenerateMoreButton } from './ui/GenerateMoreButton';
import { HistoryList } from './ui/HistoryList';
import { HistoryModal } from './ui/HistoryModal';

const HistoryPage = () => {
	return (
		<div className={styles.container}>
			<HistoryList />
			<div className={styles.actions}>
				<GenerateMoreButton />
				<ClearHistoryButton />
			</div>
			<HistoryModal />
		</div>
	);
};

export default HistoryPage;
