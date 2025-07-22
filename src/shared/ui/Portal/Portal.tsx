import type { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = PropsWithChildren & {
	mountElement?: HTMLElement | null;
};

export const Portal: FC<PortalProps> = ({ children, mountElement }) => {
	const element = mountElement ?? document.body;

	return createPortal(children, element);
};
