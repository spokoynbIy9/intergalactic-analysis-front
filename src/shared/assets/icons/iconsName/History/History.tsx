import type { FC } from 'react';
import type { IconBaseProps } from '../../types/iconBase';
import { SvgBase } from '../../SvgBase';

export const History: FC<IconBaseProps> = ({ size, ...rest }) => {
	return (
		<SvgBase size={size} {...rest}>
			<path
				stroke="#201B10"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2.439"
				d="M17.5 10.997V17.5l4.065 4.064"
			/>
			<path
				stroke="#201B10"
				stroke-width="1.5"
				d="M8.082 27.98c5.403 4.873 13.591 4.913 18.941.103l.664.664c-5.722 5.182-14.505 5.13-20.27-.105l.665-.663ZM28.643 7.416c5.235 5.764 5.285 14.548.105 20.27l-.664-.665c4.81-5.35 4.77-13.54-.104-18.942l.663-.663Zm-25.257 8.75a14.261 14.261 0 0 0 3.632 10.75l-.663.664a15.198 15.198 0 0 1-3.9-11.541l.931.128Zm5.048-7.46-.005.94-1.084-.006.619-.618.315-.316h.155Zm-1.12-2.454c5.721-5.182 14.504-5.13 20.269.103l-.663.663c-5.403-4.873-13.593-4.913-18.943-.103l-.663-.663Zm-1.818-.331-.934.933-.006-1.08.939-.007v.154Z"
			/>
		</SvgBase>
	);
};
