import type { FC } from 'react';
import type { IconBaseProps } from '../../types/iconBase';
import { SvgBase } from '../../SvgBase';

export const Clear: FC<IconBaseProps> = ({ size, ...rest }) => {
	return (
		<SvgBase size={size} {...rest}>
			<path
				d="M1.16675 20.3334L10.5001 11.0001M10.5001 11.0001L19.8334 1.66675M10.5001 11.0001L1.16675 1.66675M10.5001 11.0001L19.8334 20.3334"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</SvgBase>
	);
};
