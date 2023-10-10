export class InputHelper {
	static isSerializedArray(arg: string) {
		if (typeof arg !== "string") {
			return false;
		}

		if (arg.trim().startsWith("[") && arg.trim().endsWith("]")) {
			try {
				const parsed = JSON.parse(arg);
				return Array.isArray(parsed);
			} catch (e) {
				return false;
			}
		}

		return false;
	}

	static isCommaSeparated(arg: string) {
		return arg.includes(",");
	}

	static getArrayFromArrayLike(arg: string) {
		if (this.isSerializedArray(arg)) {
			return JSON.parse(arg) as string[];
		}

		if (this.isCommaSeparated(arg)) {
			return arg.split(",");
		}

		return [arg];
	}
}
