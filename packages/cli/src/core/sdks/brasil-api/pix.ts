import { Logger } from "@/helpers/logger";
import { OutputHelper } from "@/helpers/output-helper";
import { BrasilApi } from "@brasil-interface/sdks";
import { program } from "commander";

const brasilApiPIX = program
	.command("brasil-api/pix")
	.description("Brasil API PIX SDK");

brasilApiPIX
	.command("get-participants")
	.description("Get information about all PIX participants.")
	.option("-o, --output <filepath>", "Output file path")
	.option("-c, --copy", "Copy the result to the clipboard.")
	.option("-d, --debug", "Show debug information.")
	.action(async (options) => {
		const { output, copy, debug } = options;
		const logger = new Logger(debug);
		const PIX = new BrasilApi.PIX();

		try {
			const result = await PIX.getParticipants();

			OutputHelper.handleResultOutputBasedOnOptions(result, {
				output,
				copyToClipboard: copy,
			});
		} catch (error) {
			logger.info(
				`PT-BR: Não foi possível obter informações sobre os participantes do PIX.`
			);
			logger.info(`EN: Couldn't get information about PIX participants.`);
			logger.error(error);
		}
	});
