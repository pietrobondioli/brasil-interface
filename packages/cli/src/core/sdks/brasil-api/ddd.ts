import { Logger } from "@/helpers/logger";
import { OutputHelper } from "@/helpers/output-helper";
import { BrasilApi } from "@brasil-interface/sdks";
import { program } from "commander";

const brasilApiDDD = program
  .command("brasil-api/ddd")
  .description("Brasil API DDD SDK");

brasilApiDDD
  .command("get-estado-e-cidades <ddd>")
  .description("Get state and list of cities by DDD.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .option("-d, --debug", "Show debug information.")
  .action(async (ddd, options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const dddService = new BrasilApi.DDD();

    try {
      const result = await dddService.getEstadoECidadesPorDdd(ddd);

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(
        `PT-BR: Não foi possível obter informações para o DDD ${ddd}.`,
      );
      logger.info(`EN: Couldn't get information for DDD ${ddd}.`);
      logger.error(error);
    }
  });
