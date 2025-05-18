import { Logger } from "@/helpers/logger";
import { OutputHelper } from "@/helpers/output-helper";
import { BrasilApi } from "@brasil-interface/sdks";
import { program } from "commander";

const corretoras = program
  .command("brasil-api/corretoras")
  .description("Brasil API Corretoras SDK");

corretoras
  .command("get-all")
  .description("Get information about active brokers listed in CVM.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .option("-d, --debug", "Show debug information.")
  .action(async (options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const corretoras = new BrasilApi.Corretoras();

    try {
      const result = await corretoras.getCorretoras();

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(
        `PT-BR: Não foi possível obter informações sobre as corretoras.`,
      );
      logger.info(`EN: Couldn't get information about the brokers.`);
      logger.error(error);
    }
  });

corretoras
  .command("get-by-cnpj <cnpj>")
  .description("Get information about an active broker listed in CVM by CNPJ.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .option("-d, --debug", "Show debug information.")
  .action(async (cnpj, options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const corretoras = new BrasilApi.Corretoras();

    try {
      const result = await corretoras.getCorretoraByCnpj(cnpj);

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(
        `PT-BR: Não foi possível obter informações sobre a corretora com CNPJ ${cnpj}.`,
      );
      logger.info(
        `EN: Couldn't get information about the broker with CNPJ ${cnpj}.`,
      );
      logger.error(error);
    }
  });
