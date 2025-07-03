import type { FC, PropsWithChildren } from 'react';

import cn from 'classnames';

import type { WithClassName } from '@/shared/types';

import styles from './Typography.module.css';

type TypographyProps = PropsWithChildren &
	WithClassName & {
		color?: 'dark' | 'light' | 'purple' | 'error';
		size?: 'xs' | 's' | 'm' | 'l' | 'xl';
		as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		weight?: 'light' | 'regular' | 'medium' | 'bold' | 'extrabold';
		style?: 'normal' | 'italic';
		maxRowsNumber?: number;
	};

export const Typography: FC<TypographyProps> = ({
	as: Component = 'p',
	size = 'm',
	weight = 'regular',
	style = 'normal',
	color = 'dark',
	children,
	maxRowsNumber,
	className,
}) => {
	const lineClampStyle = maxRowsNumber
		? { WebkitLineClamp: maxRowsNumber }
		: {};

	return (
		<Component
			className={cn(
				className,
				styles[`text-size-${size}`],
				styles[`text-weight-${weight}`],
				styles[`text-style-${style}`],
				styles[`text-color-${color}`],
				{ [styles.withLineClamp]: Boolean(maxRowsNumber) }
			)}
			style={{ ...lineClampStyle }}
		>
			{children}
		</Component>
	);
};
