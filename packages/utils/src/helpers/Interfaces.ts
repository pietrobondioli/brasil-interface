interface ICaseStrategy {
	isValid(value: string): boolean;
	generate(): string;
	generateMasked(): string;
	mask(value: string): string;
	unmask(value: string): string;
}
