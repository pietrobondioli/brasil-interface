export class OutputHelper {
	static handleResultOutputBasedOnOptions(
		result: any,
		options: { output?: string; isJson?: boolean }
	) {
		const { output, isJson } = options;

		const resultToBePrinted = isJson ? JSON.stringify(result) : result;

		if (output) {
			const fs = require("fs");
			fs.writeFileSync(output, resultToBePrinted);
		} else {
			console.log(resultToBePrinted);
		}
	}
}
