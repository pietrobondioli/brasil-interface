import { Logger } from "@/helpers/logger";
import { OutputHelper } from "@/helpers/output-helper";
import { BrasilApi } from "@brasil-interface/sdks";
import { program } from "commander";

const brasilApiCptec = program
  .command("brasil-api/cptec")
  .description("Brasil API CPTEC SDK");

brasilApiCptec
  .command("get-cidades")
  .description("Get information about all cities in CPTEC.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .option("-d, --debug", "Show debug information.")
  .action(async (options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const cptec = new BrasilApi.CPTEC();

    try {
      const result = await cptec.getCidades();

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(
        `PT-BR: Não foi possível obter informações sobre as cidades.`,
      );
      logger.info(`EN: Couldn't get information about the cities.`);
      logger.error(error);
    }
  });

brasilApiCptec
  .command("get-clima-capitais")
  .description("Get current weather conditions in the country's capitals.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .option("-d, --debug", "Show debug information.")
  .action(async (options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const cptec = new BrasilApi.CPTEC();

    try {
      const result = await cptec.getClimaCapitais();

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(
        `PT-BR: Não foi possível obter informações sobre o clima nas capitais.`,
      );
      logger.info(`EN: Couldn't get weather information for the capitals.`);
      logger.error(error);
    }
  });

brasilApiCptec
  .command("buscar-cidades <cityName>")
  .description("Search for cities by name.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .option("-d, --debug", "Show debug information.")
  .action(async (cityName, options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const cptec = new BrasilApi.CPTEC();

    try {
      const result = await cptec.buscarCidades(cityName);

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(`PT-BR: Não foi possível encontrar a cidade ${cityName}.`);
      logger.info(`EN: Couldn't find the city ${cityName}.`);
      logger.error(error);
    }
  });

brasilApiCptec
  .command("get-clima-aeroporto <icaoCode>")
  .description("Get current weather conditions at a specific airport.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .option("-d, --debug", "Show debug information.")
  .action(async (icaoCode, options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const cptec = new BrasilApi.CPTEC();

    try {
      const result = await cptec.getClimaAeroporto(icaoCode);

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(
        `PT-BR: Não foi possível obter informações meteorológicas para o aeroporto ${icaoCode}.`,
      );
      logger.info(
        `EN: Couldn't get weather information for the airport ${icaoCode}.`,
      );
      logger.error(error);
    }
  });

brasilApiCptec
  .command("get-previsao-meteorologica <cityCode>")
  .description("Get the weather forecast for 1 day in the specified city.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .option("-d, --debug", "Show debug information.")
  .action(async (cityCode, options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const cptec = new BrasilApi.CPTEC();

    try {
      const result = await cptec.getPrevisaoMeteorologica(cityCode);

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(
        `PT-BR: Não foi possível obter a previsão meteorológica para a cidade com código ${cityCode}.`,
      );
      logger.info(
        `EN: Couldn't get the weather forecast for the city with code ${cityCode}.`,
      );
      logger.error(error);
    }
  });

brasilApiCptec
  .command("get-previsao-meteorologica-ate6dias <cityCode> <days>")
  .description(
    "Get the weather forecast for up to 6 days in the specified city.",
  )
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .action(async (cityCode, days, options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const cptec = new BrasilApi.CPTEC();

    try {
      const result = await cptec.getPrevisaoMeteorologicaAte6Dias(
        cityCode,
        days,
      );

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(
        `PT-BR: Não foi possível obter a previsão meteorológica para a cidade com código ${cityCode} para ${days} dias.`,
      );
      logger.info(
        `EN: Couldn't get the weather forecast for the city with code ${cityCode} for ${days} days.`,
      );
      logger.error(error);
    }
  });

brasilApiCptec
  .command("get-previsao-oceanica <cityCode>")
  .description("Get the oceanic forecast for 1 day in the specified city.")
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .action(async (cityCode, options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const cptec = new BrasilApi.CPTEC();

    try {
      const result = await cptec.getPrevisaoOceanica(cityCode);

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(
        `PT-BR: Não foi possível obter a previsão oceânica para a cidade com código ${cityCode}.`,
      );
      logger.info(
        `EN: Couldn't get the oceanic forecast for the city with code ${cityCode}.`,
      );
      logger.error(error);
    }
  });

brasilApiCptec
  .command("get-previsao-oceanica-ate6dias <cityCode> <days>")
  .description(
    "Get the oceanic forecast for up to 6 days in the specified city.",
  )
  .option("-o, --output <filepath>", "Output file path")
  .option("-c, --copy", "Copy the result to the clipboard.")
  .action(async (cityCode, days, options) => {
    const { output, copy, debug } = options;
    const logger = new Logger(debug);
    const cptec = new BrasilApi.CPTEC();

    try {
      const result = await cptec.getPrevisaoOceanicaAte6Dias(cityCode, days);

      OutputHelper.handleResultOutputBasedOnOptions(result, {
        isJson: true,
        output,
        copyToClipboard: copy,
      });
    } catch (error) {
      logger.info(
        `PT-BR: Não foi possível obter a previsão oceânica para a cidade com código ${cityCode} para ${days} dias.`,
      );
      logger.info(
        `EN: Couldn't get the oceanic forecast for the city with code ${cityCode} for ${days} days.`,
      );
      logger.error(error);
    }
  });
