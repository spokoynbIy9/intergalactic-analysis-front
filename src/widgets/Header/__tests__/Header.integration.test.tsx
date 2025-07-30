import { describe, expect, it } from 'vitest';
import Header from '../Header';
import { renderWithRouter } from '@tests/helpers/renderWithRouter';
import { RoutePath } from '@/shared/config/routes';
import { fireEvent } from '@testing-library/react';

describe('Корректная работа роутинга при переходе по ссылкам из Header', () => {
	it('Осуществляется переход на страницу генерации CSV по клику в Header', async () => {
		const { history, getByTestId } = renderWithRouter(<Header />);
		const pathToGenerate = RoutePath.GeneratePage;
		const linkToGenerate = getByTestId('navigation-generate');

		fireEvent.click(linkToGenerate);

		expect(history.location.pathname).toBe(pathToGenerate);
	});

	it('Осуществляется переход на страницу анализа CSV по клику в Header', async () => {
		const { history, getByTestId } = renderWithRouter(<Header />);
		const pathToAnalyse = RoutePath.AnalysePage;
		const linkToAnalyse = getByTestId('navigation-analyse');

		fireEvent.click(linkToAnalyse);

		expect(history.location.pathname).toBe(pathToAnalyse);
	});

	it('Осуществляется переход на страницу истории анализа по клику в Header', async () => {
		const { history, getByTestId } = renderWithRouter(<Header />);
		const pathToHistory = RoutePath.HistoryPage;
		const linkToHistory = getByTestId('navigation-history');

		fireEvent.click(linkToHistory);

		expect(history.location.pathname).toBe(pathToHistory);
	});
});
