import { actionClasses } from '../actions';
import { mockClasses } from '../mocker';
import { pageClasses } from '../pages';
import type { MyFixtures } from './types';
import { test as base, expect } from '@playwright/test';

const test = base
	.extend<{ _cleanLocalStorage: void; _fixTime: void }>({
		_cleanLocalStorage: [
			async ({ page }, use) => {
				await use();
				await page.evaluate(() => window.localStorage.clear());
			},
			{ auto: true },
		],
		_fixTime: [
			async ({ page }, use) => {
				await page.clock.setFixedTime(new Date('2024-05-21T10:00:00Z'));
				await use();
			},
			{ auto: true },
		],
	})
	.extend<MyFixtures>({
		pages: async ({ page }, use) => {
			const pages = {
				generate: new pageClasses.generate(page),
			};
			await use(pages);
		},
		actions: async ({ page, pages }, use) => {
			const actions = {
				generate: new actionClasses.generate(page, pages),
			};
			await use(actions);
		},
		mocker: async ({ page }, use) => {
			const mocker = new mockClasses.mocker(page);
			await use(mocker);
			await mocker.unmockAll();
		},
	});

export { test, expect };
