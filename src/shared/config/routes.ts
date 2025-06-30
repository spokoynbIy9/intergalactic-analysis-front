import type { RouteObject } from 'react-router-dom';

export type AppRoutesProps = RouteObject & {
	hasLayout?: boolean;
};

export const AppRoutes = {
	HomePage: 'home',
	AnalysePage: 'analyse',
	GeneratePage: 'generate',
	HistoryPage: 'history',
	NotFoundPage: 'NotFound',
} as const;

export type AppRoutes = keyof typeof AppRoutes;

export const RoutePath: Record<AppRoutes, string> = {
	HomePage: '/',
	AnalysePage: '/analyse',
	GeneratePage: '/generate',
	HistoryPage: '/history',
	NotFoundPage: '*',
};
