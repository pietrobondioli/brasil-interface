import { Logger } from "@/helpers/logger";
import { OutputHelper } from "@/helpers/output-helper";
import { BrasilApi } from "@brasil-interface/sdks";
import { program } from "commander";

const brasilApiTaxas = program
  .command("brasil-api/taxas")
  .description("Brasil API Taxas SDK");

brasilApiTaxas
  .command("get-taxas")
  .description("Get the interest rates and some official indices of Brazil.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .option("-d, --debug", "Show debug information.")
  .action(async (options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const Taxas = new BrasilApi.Taxas();

    try {
      const result = await Taxas.getTaxas();

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(`PT-BR: Não foi possível obter informações sobre as taxas.`);
      logger.info(`EN: Couldn't get information about the rates.`);
      logger.error(error);
    }
  });

brasilApiTaxas
  .command("get-taxa <sigla>")
  .description("Get information about a rate from its name/abbreviation.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .option("-d, --debug", "Show debug information.")
  .action(async (sigla, options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const Taxas = new BrasilApi.Taxas();

    try {
      const result = await Taxas.getTaxa(sigla);

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(
        `PT-BR: Não foi possível obter informações sobre a taxa com sigla ${sigla}.`,
      );
      logger.info(
        `EN: Couldn't get information about the rate with abbreviation ${sigla}.`,
      );
      logger.error(error);
    }
  });
