export class Logger {
	public constructor(private readonly shouldLogError: boolean) {}

	public log(message?: any, ...optionalParams: any[]): void {
		console.log(message, ...optionalParams);
	}

	public error(message?: any, ...optionalParams: any[]): void {
		this.shouldLogError && console.error(message, ...optionalParams);
	}

	public warn(message?: any, ...optionalParams: any[]): void {
		console.warn(message, ...optionalParams);
	}

	public debug(message?: any, ...optionalParams: any[]): void {
		console.debug(message, ...optionalParams);
	}

	public info(message?: any, ...optionalParams: any[]): void {
		console.info(message, ...optionalParams);
	}

	public trace(message?: any, ...optionalParams: any[]): void {
		console.trace(message, ...optionalParams);
	}
}
