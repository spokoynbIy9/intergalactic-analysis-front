import { expect, test } from 'packages/playwright/src';

test.beforeEach(async ({ actions }) => {
	await actions.generate.goto();
});

test('TC-GP-001: Успешная генерация и скачивание CSV файла', async ({
	page,
	pages,
	mocker,
	actions,
}) => {
	const successMessage = 'файл сгенерирован!';

	// Предусловие: Мокируем успешный ответ API для скачивания файла
	await mocker.mock('**/report*', 'col1,col2\\nval1,val2', {
		status: 200,
		contentType: 'text/csv',
		headers: {
			'Content-Disposition': 'attachment; filename="report.csv"',
		},
		delay: 200,
	});

	await test.step('Шаг 1: Нажать на кнопку "Начать генерацию"', async () => {
		const downloadPromise = page.waitForEvent('download');

		await actions.generate.startGeneration();

		await expect(pages.generate.loader).toBeVisible();

		const download = await downloadPromise;
		expect(download.suggestedFilename()).toBe('report.csv');

		await expect(pages.generate.loader).toBeHidden();
	});

	await test.step('Шаг 2: Дождаться завершения процесса', async () => {
		// await expect(pages.generate.successMessage).toBeVisible({
		// 	timeout: 10000,
		// });
		// await expect(pages.generate.successMessage).toHaveText(successMessage);
		await expect(page.getByText(successMessage)).toBeVisible();
	});
});
