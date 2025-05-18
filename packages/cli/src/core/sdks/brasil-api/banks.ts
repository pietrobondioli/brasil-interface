import { Logger } from "@/helpers/logger";
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
  .option("-d, --debug", "Show debug information.")
  .action(async (options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const banks = new BrasilApi.Banks();

    try {
      const result = await banks.getAllBanks();

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(`PT-BR: Não foi possível obter informações sobre os bancos.`);
      logger.info(`EN: Couldn't get information about the banks.`);
      logger.error(error);
    }
  });

brasilApiBanks
  .command("get-by-code <code>")
  .description("Get information about a bank by code.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .option("-d, --debug", "Show debug information.")
  .action(async (code, options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const banks = new BrasilApi.Banks();

    try {
      const result = await banks.getBankByCode(code);

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(
        `PT-BR: Não foi possível obter informações sobre o banco ${code}.`,
      );
      logger.info(`EN: Couldn't get information about the bank ${code}.`);
      logger.error(error);
    }
  });
