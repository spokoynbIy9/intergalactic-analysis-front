import type { FC } from 'react';

import { SvgBase } from '../../SvgBase';
import type { IconBaseProps } from '../../types/iconBase';

export const Upload: FC<IconBaseProps> = ({ size, ...rest }) => (
	<SvgBase size={size} {...rest}>
		<path
			stroke="#201B10"
			stroke-linecap="round"
			stroke-miterlimit="10"
			stroke-width="2.5"
			d="M17.5 4.684v17.538"
		/>
		<path
			stroke="#201B10"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2.5"
			d="M24.245 10.873 18.462 5.09a1.366 1.366 0 0 0-1.922 0l-5.785 5.783M4.01 20.198v6.745a3.369 3.369 0 0 0 3.373 3.373h20.235a3.368 3.368 0 0 0 3.371-3.373v-6.745"
		/>
	</SvgBase>
);
