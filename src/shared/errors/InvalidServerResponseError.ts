export class InvalidServerResponseError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidServerResponseError';
	}
}
