import { EMPTY_STRING } from "./Constants";

export namespace Transform {
	export class String {
		public static applyMask(
			value: string,
			formatRegex: RegExp,
			formatPattern: string
		): string {
			return value.replace(formatRegex, formatPattern);
		}

		public static clearString(value: unknown, cutOffRegex: RegExp): string {
			return (
				value?.toString().replace(cutOffRegex, EMPTY_STRING) ?? EMPTY_STRING
			);
		}

		public static removeDigitsAtPositions(
			s: string,
			positions: number[]
		): string {
			let arr = [...s];
			positions.sort((a, b) => b - a);
			for (let pos of positions) {
				if (pos < arr.length) {
					arr.splice(pos, 1);
				}
			}
			return arr.join("");
		}
	}
}
