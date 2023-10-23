import { OutputHelper } from "@/helpers/output-helper";
import { BrasilApi } from "@brasil-interface/sdks";
import { program } from "commander";

const brasilApiBanks = program
	.command("brasil-api/banks")
	.description("Brasil API Banks SDK");

brasilApiBanks
	.command("get-all")
	.description("Get information about all banks in Brazil.")
	.option("-o, --output <filepath>", "Output file path")
	.option("-c, --copy", "Copy the result to the clipboard.")
	.action(async (options) => {
		const { output, copy } = options;
		const banks = new BrasilApi.Banks();

		const result = await banks.getAllBanks();

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			copyToClipboard: copy,
		});
	});

brasilApiBanks
	.command("get-by-code <code>")
	.description("Get information about a bank by code.")
	.option("-o, --output <filepath>", "Output file path")
	.option("-c, --copy", "Copy the result to the clipboard.")
	.action(async (code, options) => {
		const { output, copy } = options;
		const banks = new BrasilApi.Banks();

		const result = await banks.getBankByCode(code);

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			copyToClipboard: copy,
		});
	});
