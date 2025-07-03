import { Navigation } from './ui/Navigation';
import { Title } from './ui/Title';
import styles from './Header.module.css';

const Header = () => {
	return (
		<header className={styles.header}>
			<Title />
			<Navigation />
		</header>
	);
};

export default Header;
