import clipboardy from "clipboardy";
import fs from "fs";

export class OutputHelper {
	static handleResultOutputBasedOnOptions(
		result: any,
		options: { output?: string; isJson?: boolean; copyToClipboard?: boolean }
	) {
		const { output, isJson, copyToClipboard } = options;

		const resultToBePrinted = isJson ? JSON.stringify(result) : result;

		if (copyToClipboard) {
			clipboardy.writeSync(resultToBePrinted);
		}

		if (output) {
			fs.writeFileSync(output, resultToBePrinted);
		} else {
			console.log(resultToBePrinted);
		}
	}
}
