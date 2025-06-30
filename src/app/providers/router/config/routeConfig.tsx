import { Navigate } from 'react-router-dom';
import {
	AppRoutes,
	RoutePath,
	type AppRoutesProps,
} from '@/shared/config/routes';
import { AnalysePage } from '@/pages/analyse-page';
import { GeneratePage } from '@/pages/generate-page';
import { HistoryPage } from '@/pages/history-page';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
	AnalysePage: {
		path: RoutePath.AnalysePage,
		element: <AnalysePage />,
		hasLayout: true,
	},
	GeneratePage: {
		path: RoutePath.GeneratePage,
		element: <GeneratePage />,
		hasLayout: true,
	},
	HistoryPage: {
		path: RoutePath.HistoryPage,
		element: <HistoryPage />,
		hasLayout: true,
	},
	HomePage: {
		path: RoutePath.HomePage,
		element: <Navigate to={RoutePath.AnalysePage} replace={true} />,
	},
	NotFoundPage: {
		path: RoutePath.NotFoundPage,
		element: <Navigate to={RoutePath.AnalysePage} replace={true} />,
	},
};
