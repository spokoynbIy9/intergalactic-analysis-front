import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
	addToHistory,
	clearHistory,
	getHistory,
	removeFromHistory,
} from '../historyStorage';
import { STORAGE_KEY } from '../../config/storage';
import type { HistoryItemType } from '../../model/types/historyItem.type';

const MOCK_ITEM_BASE = { fileName: 'test.csv' };
const MOCK_HISTORY_ITEM: HistoryItemType = {
	...MOCK_ITEM_BASE,
	id: '1',
	timestamp: 123456789,
};

describe('Утилиты для работы с localStorage', () => {
	const localStorageMock = (() => {
		let store: Record<string, string> = {}; // Внутреннее хранилище mock'а
		return {
			getItem: vi.fn((key: string) => store[key] || null),
			setItem: vi.fn((key: string, value: string) => {
				store[key] = value;
			}),
			removeItem: vi.fn((key: string) => {
				delete store[key];
			}),
			clear: vi.fn(() => {
				store = {};
			}),
		};
	})();

	beforeEach(() => {
		// Подменяем глобальный localStorage на наш mock
		Object.defineProperty(window, 'localStorage', {
			value: localStorageMock,
			writable: true,
		});

		// Очищаем mock хранилище
		localStorageMock.clear();

		// Создаем spy'и для отслеживания вызовов методов
		vi.spyOn(localStorageMock, 'getItem');
		vi.spyOn(localStorageMock, 'setItem');
		vi.spyOn(localStorageMock, 'removeItem');
	});

	afterEach(() => {
		// Восстанавливаем все mock'и к первоначальному состоянию
		vi.restoreAllMocks();
	});

	describe('getHistory', () => {
		it('должна возвращать пустой массив, если история пуста', () => {
			expect(getHistory()).toEqual([]);

			// Проверяем, что метод getItem был вызван с правильным ключом
			expect(localStorageMock.getItem).toHaveBeenCalledWith(STORAGE_KEY);
		});

		it('должна возвращать данные из localStorage', () => {
			const history = [MOCK_HISTORY_ITEM];
			localStorageMock.setItem(STORAGE_KEY, JSON.stringify(history));

			expect(getHistory()).toEqual(history);
		});

		it('должна возвращать пустой массив при ошибке парсинга JSON', () => {
			// Сохраняем невалидный JSON в localStorage
			// Такое может произойти при ручном редактировании или сбоях
			localStorageMock.setItem(STORAGE_KEY, 'невалидный-json');

			expect(getHistory()).toEqual([]);
		});
	});

	describe('addToHistory', () => {
		it('должна добавлять новый элемент в историю', () => {
			const newItem = addToHistory(MOCK_ITEM_BASE);

			expect(newItem).toMatchObject(MOCK_ITEM_BASE); // Содержит исходные данные
			expect(newItem).toHaveProperty('id'); // Сгенерирован ID
			expect(newItem).toHaveProperty('timestamp'); // Добавлен timestamp

			const history = getHistory();
			expect(history).toHaveLength(1);
			expect(history[0]).toEqual(newItem);
		});

		it('должна добавлять новый элемент в начало истории', () => {
			localStorageMock.setItem(
				STORAGE_KEY,
				JSON.stringify([MOCK_HISTORY_ITEM])
			);

			const newItem = addToHistory({ fileName: 'new.csv' });

			const history = getHistory();
			expect(history).toHaveLength(2);
			expect(history[0]).toEqual(newItem); // Новый элемент первый
			expect(history[1]).toEqual(MOCK_HISTORY_ITEM); // Старый элемент второй
		});
	});

	describe('removeFromHistory', () => {
		it('должна удалять элемент из истории по id', () => {
			const historyWithTwoItems = [
				MOCK_HISTORY_ITEM,
				{ ...MOCK_HISTORY_ITEM, id: '2' },
			];
			localStorageMock.setItem(
				STORAGE_KEY,
				JSON.stringify(historyWithTwoItems)
			);

			// Удаляем элемент с ID '1'
			removeFromHistory('1');

			// Должен остаться только элемент с ID '2'
			const history = getHistory();
			expect(history).toHaveLength(1);
			expect(history[0].id).toBe('2');
		});

		it('не должна изменять историю, если id не найден', () => {
			localStorageMock.setItem(
				STORAGE_KEY,
				JSON.stringify([MOCK_HISTORY_ITEM])
			);

			// Пытаемся удалить несуществующий элемент
			removeFromHistory('non-existent-id');

			// История должна остаться неизменной
			expect(getHistory()).toEqual([MOCK_HISTORY_ITEM]);
		});
	});

	describe('clearHistory', () => {
		it('должна удалять ключ истории из localStorage', () => {
			localStorageMock.setItem(
				STORAGE_KEY,
				JSON.stringify([MOCK_HISTORY_ITEM])
			);

			// Очищаем всю историю
			clearHistory();

			// 1. removeItem должен быть вызван с правильным ключом
			expect(localStorageMock.removeItem).toHaveBeenCalledWith(
				STORAGE_KEY
			);
			// 2. История должна стать пустой
			expect(getHistory()).toEqual([]);
		});
	});
});
