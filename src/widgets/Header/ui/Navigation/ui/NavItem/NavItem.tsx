import type { FC, ReactNode } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { Typography } from '@/shared/ui/Typography';

import styles from './NavItem.module.css';

type NavItemProps = {
	to: string;
	title: string;
	icon: ReactNode;
};

export const NavItem: FC<NavItemProps> = ({ to, title, icon }) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }: { isActive: boolean }) =>
				cn(styles.root, { [styles.active]: isActive })
			}
		>
			{icon} <Typography size="m">{title}</Typography>
		</NavLink>
	);
};
