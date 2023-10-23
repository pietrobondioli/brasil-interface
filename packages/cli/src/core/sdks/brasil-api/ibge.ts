import { Logger } from "@/helpers/logger";
import { OutputHelper } from "@/helpers/output-helper";
import { BrasilApi } from "@brasil-interface/sdks";
import { program } from "commander";

const brasilApiIBGE = program
	.command("brasil-api/ibge")
	.description("Brasil API IBGE SDK");

brasilApiIBGE
	.command("get-municipios <uf> [providers]")
	.description("Get municipalities by federative unit and providers.")
	.option("-o, --output <filepath>", "Output file path")
	.option("-c, --copy", "Copy the result to the clipboard.")
	.option("-d, --debug", "Show debug information.")
	.action(async (uf, providers, options) => {
		const { output, copy, debug } = options;
		const logger = new Logger(debug);
		const IBGE = new BrasilApi.IBGE();

		try {
			const result = await IBGE.getMunicipios(uf, providers);

			OutputHelper.handleResultOutputBasedOnOptions(result, {
				output,
				copyToClipboard: copy,
			});
		} catch (error) {
			logger.info(
				`PT-BR: Não foi possível obter informações sobre os municípios do estado ${uf}.`
			);
			logger.info(
				`EN: Couldn't get information about the municipalities of the state ${uf}.`
			);
			logger.error(error);
		}
	});

brasilApiIBGE
	.command("get-estados")
	.description("Get information about all Brazilian states.")
	.option("-o, --output <filepath>", "Output file path")
	.option("-c, --copy", "Copy the result to the clipboard.")
	.option("-d, --debug", "Show debug information.")
	.action(async (options) => {
		const { output, copy, debug } = options;
		const logger = new Logger(debug);
		const IBGE = new BrasilApi.IBGE();

		try {
			const result = await IBGE.getEstados();

			OutputHelper.handleResultOutputBasedOnOptions(result, {
				output,
				copyToClipboard: copy,
			});
		} catch (error) {
			logger.info(
				`PT-BR: Não foi possível obter informações sobre os estados brasileiros.`
			);
			logger.info(`EN: Couldn't get information about Brazilian states.`);
			logger.error(error);
		}
	});

brasilApiIBGE
	.command("get-estado <code>")
	.description("Get information about a state by its code or abbreviation.")
	.option("-o, --output <filepath>", "Output file path")
	.option("-c, --copy", "Copy the result to the clipboard.")
	.option("-d, --debug", "Show debug information.")
	.action(async (code, options) => {
		const { output, copy, debug } = options;
		const logger = new Logger(debug);
		const IBGE = new BrasilApi.IBGE();

		try {
			const result = await IBGE.getEstado(code);

			OutputHelper.handleResultOutputBasedOnOptions(result, {
				output,
				copyToClipboard: copy,
			});
		} catch (error) {
			logger.info(
				`PT-BR: Não foi possível obter informações sobre o estado com código ou sigla ${code}.`
			);
			logger.info(
				`EN: Couldn't get information about the state with code or abbreviation ${code}.`
			);
			logger.error(error);
		}
	});
