export type IconBaseProps = {
	size: number;

	color?: string;
	title?: string;
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'svg'>;
