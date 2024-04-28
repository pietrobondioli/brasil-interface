import { Logger } from "@/helpers/logger";
import { OutputHelper } from "@/helpers/output-helper";
import { BrasilApi } from "@brasil-interface/sdks";
import { program } from "commander";

const brasilApiFeriados = program
  .command("brasil-api/feriados")
  .description("Brasil API National Holidays SDK");

brasilApiFeriados
  .command("get-feriados-nacionais <year>")
  .description("Get national holidays for a specific year.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .option("-d, --debug", "Show debug information.")
  .action(async (year, options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const feriados = new BrasilApi.FeriadosNacionais();

    try {
      const result = await feriados.getFeriadosNacionais(year);

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(
        `PT-BR: Não foi possível obter os feriados nacionais para o ano ${year}.`,
      );
      logger.info(`EN: Couldn't get national holidays for the year ${year}.`);
      logger.error(error);
    }
  });
