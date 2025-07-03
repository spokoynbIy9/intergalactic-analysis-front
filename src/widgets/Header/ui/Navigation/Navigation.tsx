import { Create, Upload, History } from '@/shared/assets/icons/iconsName';
import styles from './Navigation.module.css';
import { NavItem } from './ui/NavItem';
import { RoutePath } from '@/shared/config/routes';

export const Navigation = () => {
	return (
		<nav className={styles.root}>
			<NavItem
				to={RoutePath.AnalysePage}
				title="CSV Аналитик"
				icon={<Upload size={36} />}
			/>
			<NavItem
				to={RoutePath.GeneratePage}
				title="CSV Генератор"
				icon={<Create size={36} />}
			/>
			<NavItem
				to={RoutePath.HistoryPage}
				title="История"
				icon={<History size={36} />}
			/>
		</nav>
	);
};
