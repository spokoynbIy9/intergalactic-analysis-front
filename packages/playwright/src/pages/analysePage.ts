import type { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class AnalysePage extends BasePage {
	constructor(page: Page) {
		super(page, 'analyse-page');
	}

	public get dropzone() {
		return this.root.getByTestId('dropzone');
	}

	public get dropzoneLoader() {
		return this.dropzone.getByTestId('dropzone-loader');
	}

	public get fileDisplayName() {
		return this.dropzone.getByTestId('dropzone-file-name');
	}

	public get dropzoneContent() {
		return this.root.getByTestId('dropzone-content');
	}

	public get dropzoneStatus() {
		return this.root.getByTestId('dropzone-status');
	}

	public get sendButton() {
		return this.root.getByTestId('send-button');
	}

	public get fileUploadSection() {
		return this.root.getByTestId('file-upload-section');
	}

	public get highlightsGrid() {
		return this.root.getByTestId('highlights-grid');
	}

	public get highlightCard() {
		return this.root.getByTestId('highlight-card');
	}

	public get highlightsPlaceholder() {
		return this.root.getByTestId('highlights-placeholder');
	}

	public get dropzoneError() {
		return this.root.getByTestId('dropzone-error');
	}

	public get dropzoneClearButton() {
		return this.root.getByTestId('dropzone-clear-button');
	}

	public get loader() {
		return this.root.getByTestId('loader');
	}
}
