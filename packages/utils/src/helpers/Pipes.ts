export type TransformWorker<T = any> = (value: T) => string;

export type ValidationWorker = (value: string) => boolean;

export class Pipes {
	public static runTransforms(
		value: any,
		transforms: TransformWorker[]
	): string {
		return transforms.reduce((prev, transform) => transform(prev), value);
	}

	public static runValidations(
		value: string,
		rules: ValidationWorker[]
	): boolean {
		return rules.every((rule) => rule(value));
	}
}
