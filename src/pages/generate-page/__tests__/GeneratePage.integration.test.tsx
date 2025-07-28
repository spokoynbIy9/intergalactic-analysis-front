import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import GeneratePage from '../GeneratePage';

describe('Интеграционные тесты для GeneratePage', () => {
	it('TC-GP-002: Отображение ошибки при сбое генерации на сервере', async () => {
		const errorText = 'Произошла серьезная ошибка';

		global.fetch = vi.fn().mockImplementation(() =>
			Promise.resolve({
				ok: false, // Указывает что запрос неуспешен
				status: 500, // HTTP статус код ошибки сервера
				json: () => Promise.resolve({ error: errorText }),
			})
		);

		render(
			<MemoryRouter>
				<GeneratePage />
			</MemoryRouter>
		);

		const generateButton = screen.getByTestId('generate-button');
		fireEvent.click(generateButton);

		await waitFor(() => {
			const errorMessage = screen.getByText(
				`Произошла ошибка: ${errorText}`
			);
			expect(errorMessage).toBeInTheDocument();
		});

		// ВАЖНО: Проверяем что кнопка восстановила свое состояние
		// После ошибки пользователь должен иметь возможность попробовать снова
		expect(generateButton).toBeEnabled();
	});
});
