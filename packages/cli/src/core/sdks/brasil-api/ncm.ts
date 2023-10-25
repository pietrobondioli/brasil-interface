import { Logger } from "@/helpers/logger";
import { OutputHelper } from "@/helpers/output-helper";
import { BrasilApi } from "@brasil-interface/sdks";
import { program } from "commander";

const brasilApiNCM = program
	.command("brasil-api/ncm")
	.description("Brasil API NCM SDK");

brasilApiNCM
	.command("get-ncms")
	.description("Get information about all NCMs.")
	.option("-o, --output <filepath>", "Output file path")
	.option("-c, --copy", "Copy the result to the clipboard.")
	.option("-d, --debug", "Show debug information.")
	.action(async (options) => {
		const { output, copy, debug } = options;
		const logger = new Logger(debug);
		const NCM = new BrasilApi.NCM();

		try {
			const result = await NCM.getNCMs();

			OutputHelper.handleResultOutputBasedOnOptions(result, {
				output,
				copyToClipboard: copy,
			});
		} catch (error) {
			logger.info(`PT-BR: Não foi possível obter informações sobre os NCMs.`);
			logger.info(`EN: Couldn't get information about NCMs.`);
			logger.error(error);
		}
	});

brasilApiNCM
	.command("search-ncms <search>")
	.description("Search for NCMs by code or description.")
	.option("-o, --output <filepath>", "Output file path")
	.option("-c, --copy", "Copy the result to the clipboard.")
	.option("-d, --debug", "Show debug information.")
	.action(async (search, options) => {
		const { output, copy, debug } = options;
		const logger = new Logger(debug);
		const NCM = new BrasilApi.NCM();

		try {
			const result = await NCM.searchNCMs(search);

			OutputHelper.handleResultOutputBasedOnOptions(result, {
				output,
				copyToClipboard: copy,
			});
		} catch (error) {
			logger.info(
				`PT-BR: Não foi possível obter informações sobre os NCMs que correspondem a ${search}.`
			);
			logger.info(
				`EN: Couldn't get information about NCMs that match ${search}.`
			);
			logger.error(error);
		}
	});

brasilApiNCM
	.command("get-ncm <code>")
	.description("Get information about an NCM by its code.")
	.option("-o, --output <filepath>", "Output file path")
	.option("-c, --copy", "Copy the result to the clipboard.")
	.option("-d, --debug", "Show debug information.")
	.action(async (code, options) => {
		const { output, copy, debug } = options;
		const logger = new Logger(debug);
		const NCM = new BrasilApi.NCM();

		try {
			const result = await NCM.getNCM(code);

			OutputHelper.handleResultOutputBasedOnOptions(result, {
				output,
				copyToClipboard: copy,
			});
		} catch (error) {
			logger.info(
				`PT-BR: Não foi possível obter informações sobre o NCM com código ${code}.`
			);
			logger.info(
				`EN: Couldn't get information about the NCM with code ${code}.`
			);
			logger.error(error);
		}
	});
