import { Logger } from "@/helpers/logger";
import { OutputHelper } from "@/helpers/output-helper";
import { BrasilApi } from "@brasil-interface/sdks";
import { program } from "commander";

const brasilApiRegistroBR = program
  .command("brasil-api/registrobr")
  .description("Brasil API RegistroBR SDK");

brasilApiRegistroBR
  .command("get-domain-info <domain>")
  .description("Evaluates the status of a .br domain.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .option("-d, --debug", "Show debug information.")
  .action(async (domain, options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const RegistroBR = new BrasilApi.RegistroBR();

    try {
      const result = await RegistroBR.getDomainInfo(domain);
      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(
        `PT-BR: Não foi possível obter informações sobre o domínio ${domain}.`,
      );
      logger.info(`EN: Couldn't get information about the domain ${domain}.`);
      logger.error(error);
    }
  });
