import type { FC } from 'react';
import type { IconBaseProps } from '../../types/iconBase';
import { SvgBase } from '../../SvgBase';

export const Clear: FC<IconBaseProps> = ({ size, ...rest }) => {
	return (
		<SvgBase size={size} {...rest}>
			<path
				stroke="#fff"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M7.167 25.333 16.5 16m0 0 9.333-9.333M16.5 16 7.167 6.667M16.5 16l9.333 9.333"
			/>
		</SvgBase>
	);
};
