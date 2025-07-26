import { STORAGE_KEY } from '@/features/history/config/storage';
import { useHistoryStore } from '@/features/history/model/store';
import { historyMock } from '@tests/test-data/mocks/history';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HistoryPage from '../HistoryPage';

// Мокируем localStorage с дополнительными возможностями
const localStorageMock = (() => {
	let store: Record<string, string> = {}; // Внутреннее хранилище mock'а
	return {
		getItem(key: string) {
			return store[key] || null;
		},
		setItem(key: string, value: string) {
			store[key] = value.toString();
		},
		removeItem(key: string) {
			delete store[key];
		},
		clear() {
			store = {};
		},
		// ДОПОЛНИТЕЛЬНЫЙ МЕТОД: для отладки в тестах
		getStore() {
			return store;
		},
	};
})();

// Подменяем глобальный localStorage на наш контролируемый mock
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Сохраняем initial state для сброса между тестами
const initialHistoryState = useHistoryStore.getState();

describe('Интеграционные тесты для HistoryPage', () => {
	beforeEach(() => {
		// 1. Очищаем localStorage и заполняем тестовыми данными
		localStorageMock.clear();
		localStorageMock.setItem(STORAGE_KEY, JSON.stringify(historyMock));

		// 2. Сбрасываем состояние стора перед каждым тестом
		// true означает полную замену состояния, а не merge
		useHistoryStore.setState(initialHistoryState, true);
	});

	it('TC-HY-001: Отображение списка записей в истории', async () => {
		render(
			<MemoryRouter>
				<HistoryPage />
			</MemoryRouter>
		);

		const historyItems = await screen.findAllByTestId('history-item');
		expect(historyItems).toHaveLength(2); // Соответствует historyMock

		// Проверяем что конкретные данные отображаются
		expect(screen.getByText(historyMock[0].fileName)).toBeInTheDocument();
		expect(screen.getByText(historyMock[1].fileName)).toBeInTheDocument();
	});

	it('TC-HY-002: Удаление одной записи из истории', async () => {
		render(
			<MemoryRouter>
				<HistoryPage />
			</MemoryRouter>
		);

		// Проверяем начальное состояние
		let historyItems = await screen.findAllByTestId('history-item');
		expect(historyItems).toHaveLength(2);

		const deleteButton = screen.getAllByTestId(
			'history-item-delete-button'
		)[0];
		fireEvent.click(deleteButton);

		historyItems = await screen.findAllByTestId('history-item');
		expect(historyItems).toHaveLength(1);

		// Проверяем что конкретно удаленный элемент исчез
		expect(
			screen.queryByText(historyMock[0].fileName)
		).not.toBeInTheDocument();
	});

	it('TC-HY-003: Открытие и закрытие модального окна с деталями отчета', async () => {
		render(
			<MemoryRouter>
				<HistoryPage />
			</MemoryRouter>
		);

		const successfulItem = screen.getByText(historyMock[0].fileName);
		fireEvent.click(successfulItem);

		const modal = await screen.findByTestId('history-modal');
		expect(modal).toBeInTheDocument();

		const closeButton = screen.getByTestId('modal-close-button');
		fireEvent.click(closeButton);

		// ВАЖНО: ожидаем исчезновения, а не просто скрытия
		await waitFor(() => {
			expect(
				screen.queryByTestId('history-modal')
			).not.toBeInTheDocument();
		});
	});

	it('TC-HY-004: Полная очистка истории', async () => {
		render(
			<MemoryRouter>
				<HistoryPage />
			</MemoryRouter>
		);

		const clearAllButton = screen.getByTestId('clear-history-button');
		fireEvent.click(clearAllButton);

		await waitFor(() => {
			expect(
				screen.queryByTestId('history-item')
			).not.toBeInTheDocument();
		});

		expect(
			screen.queryByTestId('clear-history-button')
		).not.toBeInTheDocument();
	});
});
