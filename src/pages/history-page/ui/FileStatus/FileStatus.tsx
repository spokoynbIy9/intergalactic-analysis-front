import type { FC } from 'react';
import cn from 'classnames';

import styles from './FileStatus.module.css';
import { Typography } from '@/shared/ui/Typography';
import { Smile, SmileSad } from '@/shared/assets/icons/iconsName';

type FileStatusProps = {
	type: 'success' | 'error';
	isActive: boolean;
};
export const FileStatus: FC<FileStatusProps> = ({ type, isActive }) => {
	return (
		<span className={cn(styles.root, { [styles.active]: isActive })}>
			{type === 'success' ? (
				<>
					<Typography>Обработан успешно</Typography>
					<Smile size={40} />
				</>
			) : (
				<>
					<Typography>Не удалось обработать</Typography>
					<SmileSad size={40} />
				</>
			)}
		</span>
	);
};
