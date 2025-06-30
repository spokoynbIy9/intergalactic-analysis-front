import type { FC, ReactNode } from 'react';

interface LayoutProps {
	children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<div className="page-wrapper">
			<p>Header</p>
			<div>{children}</div>
		</div>
	);
};

export default Layout;
