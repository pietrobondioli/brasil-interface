import fs from "fs";

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

	static getArrayFromInputAlternativesOrFail(
		cmdArg: string,
		options: { input?: string }
	): string[] {
		let input: string = "";
		let array: string[] = [];

		if (cmdArg) {
			input = cmdArg;
		} else if (input) {
			input = fs.readFileSync(input, "utf8");
		} else {
			throw new Error(
				"PT-BR: Nenhum input válido fornecido. EN-US: No valid input provided."
			);
		}

		array = InputHelper.getArrayFromArrayLike(input);

		return array;
	}
}
