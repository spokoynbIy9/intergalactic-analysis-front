import { Logo } from '@/shared/assets/icons/Logo';
import { Typography } from '@/shared/ui/Typography';

import styles from './Title.module.css';

export const Title = () => (
	<div className={styles.root}>
		<Logo />
		<Typography className={styles.title} weight="medium" as="h1">
			Межгалактическая аналитика
		</Typography>
	</div>
);
