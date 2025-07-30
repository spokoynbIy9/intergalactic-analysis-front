import { successAnalysisMock } from '@tests/test-data/mocks/analysis-success';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from 'packages/playwright/src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.beforeEach(async ({ actions, mocker }) => {
	await mocker.mock('**/aggregate*', successAnalysisMock, { delay: 200 });
	await actions.analyse.goto();
});

test('TC-AP-001: Успешная загрузка и обработка CSV файла через кнопку "Загрузить файл"', async ({
	pages,
	actions,
	page,
}) => {
	const filePath = path.join(__dirname, '..', 'test-data', 'test-data.csv');
	const fileName = 'test-data.csv';

	await test.step('Шаг 1 и 2: Нажать на кнопку "Загрузить файл" и выбрать валидный .csv файл', async () => {
		await actions.analyse.uploadFile(filePath);

		await expect(pages.analyse.dropzone).toContainText(fileName);
		await expect(pages.analyse.sendButton).toBeEnabled();
	});

	await test.step('Шаг 3: Нажать кнопку "Отправить" и проверить результат', async () => {
		await actions.analyse.send();

		await expect(pages.analyse.loader).toBeVisible();
		await expect(pages.analyse.loader).toBeHidden({ timeout: 10000 });
		await expect(pages.analyse.highlightsGrid).toBeVisible();

		const cards = await pages.analyse.highlightCard.all();
		expect(cards.length).toBe(8);

		// Проверяем, что в истории появилась запись
		await actions.history.goto();
		const historyItems = page.getByTestId('history-item');
		const countHistoryItems = await historyItems.count();
		expect(countHistoryItems).toBe(1);
	});
});

test('TC-AP-002: Успешная загрузка и обработка CSV файла через Drag-and-Drop', async ({
	page,
	pages,
	actions,
}) => {
	const filePath = path.join(__dirname, '..', 'test-data', 'test-data.csv');
	const fileName = 'test-data.csv';

	await test.step('Шаг 1: Перетащить валидный `.csv` файл из файловой системы компьютера в область Dropzone на странице', async () => {
		await actions.analyse.uploadFileWithDragAndDrop(filePath, fileName);

		await expect(pages.analyse.dropzoneContent).toContainText(fileName);
		await expect(pages.analyse.dropzone).toContainText('файл загружен!');
		await expect(pages.analyse.sendButton).toBeEnabled();
	});

	await test.step('Шаг 2: Нажать кнопку "Отправить"', async () => {
		await actions.analyse.send();

		await expect(pages.analyse.loader).toBeVisible();
		await expect(pages.analyse.loader).toBeHidden({ timeout: 10000 });
		await expect(pages.analyse.highlightsGrid).toBeVisible();

		const cards = await pages.analyse.highlightCard.all();
		expect(cards.length).toBe(8);

		// Проверяем, что в истории появилась запись
		await actions.history.goto();
		const historyItems = page.getByTestId('history-item');
		const countHistoryItems = await historyItems.count();
		expect(countHistoryItems).toBe(1);
		await expect(historyItems.nth(0)).toContainText(fileName);
	});
});
