import { Logger } from "@/helpers/logger";
import { OutputHelper } from "@/helpers/output-helper";
import { BrasilApi } from "@brasil-interface/sdks";
import { program } from "commander";

const brasilApiFIPE = program
  .command("brasil-api/fipe")
  .description("Brasil API FIPE SDK");

brasilApiFIPE
  .command("get-marcas <tipoVeiculo> [tabelaReferencia]")
  .description("Get vehicle brands by vehicle type and reference table.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .option("-d, --debug", "Show debug information.")
  .action(async (tipoVeiculo, tabelaReferencia, options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const fipe = new BrasilApi.FIPE();

    try {
      const result = await fipe.getMarcas(tipoVeiculo, tabelaReferencia);

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(
        `PT-BR: Não foi possível obter as marcas para o tipo de veículo ${tipoVeiculo}.`,
      );
      logger.info(`EN: Couldn't get brands for vehicle type ${tipoVeiculo}.`);
      logger.error(error);
    }
  });

brasilApiFIPE
  .command("get-veiculo <codigoFipe> [tabelaReferencia]")
  .description("Get vehicle information by its FIPE code and reference table.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .option("-d, --debug", "Show debug information.")
  .action(async (codigoFipe, tabelaReferencia, options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const fipe = new BrasilApi.FIPE();

    try {
      const result = await fipe.getVeiculoPorCodigoFipe(
        codigoFipe,
        tabelaReferencia,
      );

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(
        `PT-BR: Não foi possível obter informações do veículo com código FIPE ${codigoFipe}.`,
      );
      logger.info(
        `EN: Couldn't get vehicle information for FIPE code ${codigoFipe}.`,
      );
      logger.error(error);
    }
  });

brasilApiFIPE
  .command("get-tabelas")
  .description("Get the existing reference tables.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .option("-d, --debug", "Show debug information.")
  .action(async (options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const fipe = new BrasilApi.FIPE();

    try {
      const result = await fipe.getTabelasReferencia();

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(`PT-BR: Não foi possível obter as tabelas de referência.`);
      logger.info(`EN: Couldn't get reference tables.`);
      logger.error(error);
    }
  });
