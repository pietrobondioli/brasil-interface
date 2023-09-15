export type Transform<T = any> = (value: T) => string;

export type Validation = (value: string) => boolean;

export class Pipes {
	public static runTransforms(transforms: Transform[], value: any): string {
		return transforms.reduce((prev, transform) => transform(prev), value);
	}

	public static runValidations(rules: Validation[], value: string): boolean {
		return rules.every((rule) => rule(value));
	}
}
