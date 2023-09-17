export namespace Assert {
	export class String {
		public static isDefined(value: unknown): boolean {
			return !!value && value !== undefined && value !== null;
		}

		public static isNotEmpty(value: string): boolean {
			return !!value && value.length > 0;
		}

		public static hasLengthOf(value: string, length: number): boolean {
			return !!value && value.length === length;
		}

		public static startsWith(value: string, start: string): boolean {
			return !!value && value.startsWith(start);
		}

		public static endsWith(value: string, end: string): boolean {
			return !!value && value.endsWith(end);
		}

		public static contains(value: string, contains: string): boolean {
			return !!value && value.includes(contains);
		}

		public static containsOnlyNumbers(value: string): boolean {
			return /^\d+$/.test(value);
		}

		public static containsValueAt(
			value: string,
			index: number,
			expectedValue: string
		): boolean {
			return !!value && value.charAt(index) === expectedValue;
		}

		public static containsValueAtRange(
			value: string,
			start: number,
			end: number,
			expectedValue: string
		): boolean {
			return !!value && value.substring(start, end) === expectedValue;
		}
	}

	export class Number {
		public static isWithinRange(
			value: number,
			min: number,
			max: number
		): boolean {
			return value >= min && value <= max;
		}
	}

	export class Array {
		public static contains<T>(value: T, values: T[]): boolean {
			return values.some((v) => v === value);
		}

		public static notContains(value: string, values: string[]): boolean {
			return !values.some((v) => v === value);
		}
	}
}
