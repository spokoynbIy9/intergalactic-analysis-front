import { useAnalysisStore } from '@/features/analyse-file/model/store';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AnalysePage from '../AnalysePage';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const initialAnalysisState = useAnalysisStore.getState();

describe('Интеграционные тесты для AnalysePage', () => {
	beforeEach(() => {
		useAnalysisStore.setState(initialAnalysisState, true);
	});

	it('TC-AP-003: Отображение ошибки при сбое обработки на сервере', async () => {
		const errorMessage = 'упс, не то...';

		global.fetch = vi.fn().mockImplementation(() =>
			Promise.resolve({
				ok: false,
				status: 400,
				json: () => Promise.resolve(),
			})
		);

		render(
			<MemoryRouter>
				<AnalysePage />
			</MemoryRouter>
		);

		const fileInput = screen.getByTestId('dropzone-input');
		const validFile = new File(['a,b,c'], 'test.csv', { type: 'text/csv' });
		fireEvent.change(fileInput, { target: { files: [validFile] } });

		// Дожидаемся появления кнопки отправки
		const sendButton = await screen.findByTestId('send-button');
		fireEvent.click(sendButton);

		await waitFor(() => {
			const error = screen.getByText(errorMessage);
			expect(error).toBeInTheDocument();
		});
	});

	it('TC-AP-004: Сброс выбранного файла', async () => {
		render(
			<MemoryRouter>
				<AnalysePage />
			</MemoryRouter>
		);

		const fileInput = screen.getByTestId('dropzone-input');
		const validFile = new File(['a,b,c'], 'test.csv', { type: 'text/csv' });
		fireEvent.change(fileInput, { target: { files: [validFile] } });

		const fileNameElementBefore = await screen.findByText('test.csv');
		expect(fileNameElementBefore).toBeInTheDocument();

		const clearButton = screen.getByTestId('dropzone-clear-button');
		fireEvent.click(clearButton);

		const fileNameElementAfter = screen.queryByText('test.csv');
		expect(fileNameElementAfter).not.toBeInTheDocument();
	});
});
