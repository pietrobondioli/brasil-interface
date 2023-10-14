import { OutputHelper } from "@/helpers/output-helper";
import { ViaCepAPI } from "@brasil-interface/sdks";
import { program } from "commander";

const viaCep = program
	.command("via-cep")
	.description("ViaCepAPI utilities.");

viaCep
	.command("get-by-number <cep>")
	.description(
		"PT-BR: Obtém informações de endereço pelo número do CEP. EN-US: Get address information by CEP number."
	)
	.option(
		"-o, --output <filepath>",
		"PT-BR: Caminho do arquivo de output. EN-US: Output file path"
	)
	.option(
		"-c, --copy",
		"PT-BR: Copia o resultado para a área de transferência. EN-US: Copy the result to the clipboard."
	)
	.action(async (cep, options) => {
		const { output, copy } = options;
		const viaCepAPI = new ViaCepAPI();

		const result = await viaCepAPI.getCepByNumber(cep);

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			copyToClipboard: copy,
		});
	});
