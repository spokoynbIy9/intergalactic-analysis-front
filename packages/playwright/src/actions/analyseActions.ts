import * as fs from 'fs/promises';

import type { Page } from '@playwright/test';
import type { Pages } from '../support/types';

export class AnalyseActions {
	readonly page: Page;
	readonly pages: Pages;

	constructor(page: Page, pages: Pages) {
		this.page = page;
		this.pages = pages;
	}

	public async goto() {
		await this.page.goto('/analyse');
	}

	public async uploadFile(filePath: string) {
		const fileChooserPromise = this.page.waitForEvent('filechooser');
		await this.pages.analyse.dropzone.click();
		const fileChooser = await fileChooserPromise;
		await fileChooser.setFiles(filePath);
	}

	public async uploadFileWithDragAndDrop(filePath: string, fileName: string) {
		const buffer = await fs.readFile(filePath);
		await this.pages.analyse.dropzone.dispatchEvent('dragenter');
		const dataTransfer = await this.page.evaluateHandle(
			({ buffer, fileName, fileType }) => {
				const dt = new DataTransfer();
				const file = new File([buffer], fileName, { type: fileType });
				dt.items.add(file);
				return dt;
			},
			{
				buffer,
				fileName,
				fileType: 'text/csv',
			}
		);

		await this.pages.analyse.dropzone.dispatchEvent('drop', {
			dataTransfer,
		});
	}

	public async send() {
		await this.pages.analyse.sendButton.click();
	}

	public async clearFile() {
		await this.pages.analyse.dropzoneClearButton.click();
	}
}
