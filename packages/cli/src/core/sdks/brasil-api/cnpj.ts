import { Logger } from "@/helpers/logger";
import { OutputHelper } from "@/helpers/output-helper";
import { BrasilApi } from "@brasil-interface/sdks";
import { program } from "commander";

const brasilApiCnpj = program
	.command("brasil-api/cnpj")
	.description("Brasil API CNPJ SDK");

brasilApiCnpj
	.command("get-by-cnpj <cnpj>")
	.description("Get information about a company by CNPJ.")
	.option("-o, --output <filepath>", "Output file path")
	.option("-c, --copy", "Copy the result to the clipboard.")
	.option("-d, --debug", "Show debug information.")
	.action(async (cnpj, options) => {
		const { output, copy, debug } = options;
		const logger = new Logger(debug);
		const CNPJ = new BrasilApi.CNPJ();

		try {
			const result = await CNPJ.getCnpjInfo(cnpj);

			OutputHelper.handleResultOutputBasedOnOptions(result, {
				output,
				copyToClipboard: copy,
			});
		} catch (error) {
			logger.info(
				`PT-BR: Não foi possível obter informações sobre o CNPJ ${cnpj}.`
			);
			logger.info(`EN: Couldn't get information about the CNPJ ${cnpj}.`);
			logger.error(error);
		}
	});
