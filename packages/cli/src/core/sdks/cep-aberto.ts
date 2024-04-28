import { InputHelper } from "@/helpers/input-helper";
import { OutputHelper } from "@/helpers/output-helper";
import { CepAbertoAPI } from "@brasil-interface/sdks";
import { program } from "commander";

const cepAberto = program
  .command("cep-aberto")
  .description("CepAbertoAPI utilities.");

cepAberto
  .command("get-by-number <cep>")
  .description(
    "PT-BR: Obtém informações de endereço pelo número do CEP. EN-US: Get address information by CEP number.",
  )
  .option(
    "-t, --token <token>",
    "PT-BR: O token de acesso à API do CepAberto. EN-US: The access token to the CepAberto API.",
  )
  .option(
    "-o, --output <filepath>",
    "PT-BR: Caminho do arquivo de output. EN-US: Output file path",
  )
  .option(
    "-c, --copy",
    "PT-BR: Copia o resultado para a área de transferência. EN-US: Copy the result to the clipboard.",
  )
  .action(async (cep, options) => {
    const { token, output, copy } = options;
    const cepAbertoAPI = new CepAbertoAPI(token);

    const result = await cepAbertoAPI.getCepByNumber(cep);

    OutputHelper.handleResultOutputBasedOnOptions(result, {
      output,
      copyToClipboard: copy,
    });
  });

cepAberto
  .command("get-by-coordinates <lat> <lng>")
  .description(
    "PT-BR: Obtém informações de endereço pelas coordenadas de latitude e longitude. EN-US: Get address information by latitude and longitude coordinates.",
  )
  .option(
    "-t, --token <token>",
    "PT-BR: O token de acesso à API do CepAberto. EN-US: The access token to the CepAberto API.",
  )
  .option(
    "-o, --output <filepath>",
    "PT-BR: Caminho do arquivo de output. EN-US: Output file path",
  )
  .option(
    "-c, --copy",
    "PT-BR: Copia o resultado para a área de transferência. EN-US: Copy the result to the clipboard.",
  )
  .action(async (lat, lng, options) => {
    const { token, output, copy } = options;
    const cepAbertoAPI = new CepAbertoAPI(token);

    const result = await cepAbertoAPI.getCepByCoordinates(lat, lng);

    OutputHelper.handleResultOutputBasedOnOptions(result, {
      output,
      copyToClipboard: copy,
    });
  });

cepAberto
  .command("get-by-address <state> <city> [street] [neighborhood]")
  .description(
    "PT-BR: Obtém informações de endereço pelo estado, cidade, rua e bairro. EN-US: Get address information by state, city, street and neighborhood.",
  )
  .option(
    "-t, --token <token>",
    "PT-BR: O token de acesso à API do CepAberto. EN-US: The access token to the CepAberto API.",
  )
  .option(
    "-o, --output <filepath>",
    "PT-BR: Caminho do arquivo de output. EN-US: Output file path",
  )
  .option(
    "-c, --copy",
    "PT-BR: Copia o resultado para a área de transferência. EN-US: Copy the result to the clipboard.",
  )
  .action(async (state, city, street, neighborhood, options) => {
    const { token, output, copy } = options;
    const cepAbertoAPI = new CepAbertoAPI(token);

    const result = await cepAbertoAPI.getCepByAddress(
      state,
      city,
      street,
      neighborhood,
    );

    OutputHelper.handleResultOutputBasedOnOptions(result, {
      output,
      copyToClipboard: copy,
    });
  });

cepAberto
  .command("get-cities-by-state <state>")
  .description(
    "PT-BR: Obtém uma lista de cidades em um determinado estado. EN-US: Get a list of cities in a given state.",
  )
  .option(
    "-t, --token <token>",
    "PT-BR: O token de acesso à API do CepAberto. EN-US: The access token to the CepAberto API.",
  )
  .option(
    "-o, --output <filepath>",
    "PT-BR: Caminho do arquivo de output. EN-US: Output file path",
  )
  .option(
    "-c, --copy",
    "PT-BR: Copia o resultado para a área de transferência. EN-US: Copy the result to the clipboard.",
  )
  .action(async (state, options) => {
    const { token, output, copy } = options;
    const cepAbertoAPI = new CepAbertoAPI(token);

    const result = await cepAbertoAPI.getCitiesByState(state);

    OutputHelper.handleResultOutputBasedOnOptions(result, {
      output,
      copyToClipboard: copy,
    });
  });

cepAberto
  .command("update-ceps <cepList>")
  .description(
    "PT-BR: Atualiza uma lista de números de CEP. EN-US: Update a list of CEP numbers.",
  )
  .option(
    "-t, --token <token>",
    "PT-BR: O token de acesso à API do CepAberto. EN-US: The access token to the CepAberto API.",
  )
  .option(
    "-i, --input <filepath>",
    "PT-BR: Caminho do arquivo de input. EN-US: Input file path",
  )
  .option(
    "-o, --output <filepath>",
    "PT-BR: Caminho do arquivo de output. EN-US: Output file path",
  )
  .option(
    "-c, --copy",
    "PT-BR: Copia o resultado para a área de transferência. EN-US: Copy the result to the clipboard.",
  )
  .action(async (cepList, options) => {
    const { token, input, output, copy } = options;
    const cepAbertoAPI = new CepAbertoAPI(token);

    const cepArray = InputHelper.getArrayFromInputAlternativesOrFail(cepList, {
      input,
    });

    const result = await cepAbertoAPI.updateCeps(cepArray);

    OutputHelper.handleResultOutputBasedOnOptions(result, {
      output,
      copyToClipboard: copy,
    });
  });
