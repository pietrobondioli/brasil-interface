import { CNH } from "@brasil-interface/utils";
import { program } from "commander";

import { InputHelper } from "@/helpers/input-helper";
import { OutputHelper } from "@/helpers/output-helper";

const cnh = program.command("cnh").description("CNH utilities.");

cnh
	.command("validate <cnhList>")
	.description(
		"PT-BR: Valida uma lista de números de CNH. EN-US: Validate a list of CNH numbers."
	)
	.option(
		"-i, --input <filepath>",
		"PT-BR: Caminho do arquivo de input. EN-US: Input file path"
	)
	.option(
		"-o, --output <filepath>",
		"PT-BR: Caminho do arquivo de output. EN-US: Output file path"
	)
	.option(
		"-c, --copy",
		"PT-BR: Copia o resultado para a área de transferência. EN-US: Copy the result to the clipboard."
	)
	.action((cnhList, options) => {
		const { input, output, copy } = options;
		const cnhArray = InputHelper.getArrayFromInputAlternativesOrFail(cnhList, {
			input,
		});

		const result = cnhArray.map((cnh: string) => {
			return { value: cnh, isValid: CNH.isValid(cnh) };
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

cnh
	.command("generate")
	.description("PT-BR: Gera um número de CNH. EN-US: Generate a CNH number.")
	.option(
		"-a --amount <amount>",
		"PT-BR: Gera uma quantidade de números de CNH. EN-US: Generate an amount of CNH numbers.",
		"1"
	)
	.option(
		"-o --output <filepath>",
		"PT-BR: Salva o resultado (array) em um arquivo JSON. EN-US: Save the result (array) in a JSON file."
	)
	.option(
		"-c, --copy",
		"PT-BR: Copia o resultado para a área de transferência. EN-US: Copy the result to the clipboard."
	)
	.action((options) => {
		const { amount, output, copy } = options;

		const cnhList: string[] = [];

		for (let i = 0; i < parseInt(amount); i++) {
			const cnh = CNH.generate();

			cnhList.push(cnh);
		}

		OutputHelper.handleResultOutputBasedOnOptions(cnhList, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});
