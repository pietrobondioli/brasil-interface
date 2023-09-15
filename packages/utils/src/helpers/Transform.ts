import { EMPTY_STRING } from "./Constants";

export class Transform {
	public static applyMask(
		value: string,
		formatRegex: RegExp,
		formatPattern: string
	): string {
		return value.replace(formatRegex, formatPattern);
	}

	public static clearString(value: unknown, cutOffRegex: RegExp): string {
		return value?.toString().replace(cutOffRegex, EMPTY_STRING) ?? EMPTY_STRING;
	}
}
