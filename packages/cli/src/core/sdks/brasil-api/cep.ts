import { OutputHelper } from "@/helpers/output-helper";
import { BrasilApi } from "@brasil-interface/sdks";
import { program } from "commander";

const brasilApiCep = program
	.command("brasil-api/cep")
	.description("Brasil API CEP SDK");

brasilApiCep
	.command("get-by-number <cep>")
	.description("Get information about an address by CEP number.")
	.option("-o, --output <filepath>", "Output file path")
	.option("-c, --copy", "Copy the result to the clipboard.")
	.action(async (cep, options) => {
		const { output, copy } = options;
		const CEP = new BrasilApi.CEP();

		const result = await CEP.getCepByNumber(cep).catch((error) => {
			console.error(error);
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			copyToClipboard: copy,
		});
	});

export { brasilApiCep };
