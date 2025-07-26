import { useHistoryStore } from '@/features/history/model/store';
import { Button } from '@/shared/ui/Button';
import { clearHistory as clearHistoryStorage } from '@/features/history/lib/historyStorage';

export const ClearHistoryButton = () => {
	const { clearHistory, history } = useHistoryStore();

	const handleClearHistory = () => {
		clearHistory();
		clearHistoryStorage();
	};

	if (history.length === 0) {
		return null;
	}

	return (
		<Button
			variant="clear"
			onClick={handleClearHistory}
			data-testid="clear-history-button"
		>
			Очистить всё
		</Button>
	);
};
