import type { ButtonHTMLAttributes, FC } from 'react';
import cn from 'classnames';

import styles from './Button.module.css';

type Variant =
	| 'primary'
	| 'secondary'
	| 'download'
	| 'upload'
	| 'clear'
	| 'process';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: React.ReactNode;

	variant?: Variant;
	fullWidth?: boolean;
};

export const Button: FC<ButtonProps> = ({
	variant = 'primary',
	children,
	fullWidth = false,
	className = '',
	disabled = false,
	...rest
}) => {
	return (
		<button
			className={cn(
				styles.button,
				styles[variant],
				{
					[styles.fullWidth]: fullWidth,
					[styles.disabled]: disabled,
				},
				className
			)}
			disabled={disabled}
			{...rest}
		>
			{children}
		</button>
	);
};
