export namespace Assert {
	export class String {
		public static shouldBeDefined(value: unknown): boolean {
			return !!value && value !== undefined && value !== null;
		}

		public static shouldNotBeEmpty(value: string): boolean {
			return !!value && value.length > 0;
		}

		public static shouldHaveLengthOf(value: string, length: number): boolean {
			return !!value && value.length === length;
		}

		public static shouldStartWith(value: string, start: string): boolean {
			return !!value && value.startsWith(start);
		}

		public static shouldEndWith(value: string, end: string): boolean {
			return !!value && value.endsWith(end);
		}

		public static shouldContain(value: string, contains: string): boolean {
			return !!value && value.includes(contains);
		}

		public static shouldContainOnlyNumbers(value: string): boolean {
			return /^\d+$/.test(value);
		}

		public static shouldContainValueAt(
			value: string,
			index: number,
			expectedValue: string
		): boolean {
			return !!value && value.charAt(index) === expectedValue;
		}

		public static shouldContainValueAtRange(
			value: string,
			start: number,
			end: number,
			expectedValue: string
		): boolean {
			return !!value && value.substring(start, end) === expectedValue;
		}
	}
}
