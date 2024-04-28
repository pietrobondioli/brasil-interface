import { Logger } from "@/helpers/logger";
import { OutputHelper } from "@/helpers/output-helper";
import { BrasilApi } from "@brasil-interface/sdks";
import { program } from "commander";

const cepv2 = program
  .command("brasil-api/cep-v2")
  .description("Brasil API CEPv2 SDK");

cepv2
  .command("get-by-number <cep>")
  .description("Get information about an address by CEP number.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .option("-d, --debug", "Show debug information.")
  .action(async (cep, options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const cepv2 = new BrasilApi.CEPv2();

    try {
      const result = await cepv2.getCepByNumber(Number(cep));

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(
        `PT-BR: Não foi possível obter informações sobre o CEP ${cep}.`,
      );
      logger.info(`EN: Couldn't get information about the CEP ${cep}.`);
      logger.error(error);
    }
  });
