import { PIS } from "@brasil-interface/utils";
import { program } from "commander";

import { InputHelper } from "@/helpers/input-helper";
import { OutputHelper } from "@/helpers/output-helper";

const pis = program.command("pis").description("PIS utilities.");

pis
	.command("validate <pisList>")
	.description(
		"PT-BR: Valida uma lista de números de PIS. EN-US: Validate a list of PIS numbers."
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
	.action((pisList, options) => {
		const { input, output, copy } = options;
		const pisArray = InputHelper.getArrayFromInputAlternativesOrFail(pisList, {
			input,
		});

		const result = pisArray.map((pis: string) => {
			return { value: pis, isValid: PIS.isValid(pis) };
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

pis
	.command("generate")
	.description("PT-BR: Gera um número de PIS. EN-US: Generate a PIS number.")
	.option(
		"-a --amount <amount>",
		"PT-BR: Gera uma quantidade de números de PIS. EN-US: Generate an amount of PIS numbers.",
		"1"
	)
	.option(
		"-m --mask",
		"PT-BR: Formata o número de PIS. EN-US: Mask the PIS number."
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
		const { amount, mask, output, copy } = options;

		const pisList: string[] = [];

		for (let i = 0; i < parseInt(amount); i++) {
			const pis = mask ? PIS.generateMasked() : PIS.generate();

			pisList.push(pis);
		}

		OutputHelper.handleResultOutputBasedOnOptions(pisList, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

pis
	.command("mask <pisList>")
	.description("PT-BR: Formata um número de PIS. EN-US: Mask a PIS number.")
	.option(
		"-s --sensitive",
		"PT-BR: Formata o número de PIS de forma sensível. EN-US: Mask the PIS number in a sensitive way."
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
	.action((pisList, options) => {
		const { sensitive, input, output, copy } = options;
		const pisArray = InputHelper.getArrayFromInputAlternativesOrFail(pisList, {
			input,
		});

		const result = pisArray.map((pis: string) => {
			return {
				value: pis,
				masked: sensitive ? PIS.maskSensitive(pis) : PIS.mask(pis),
			};
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

pis
	.command("unmask <pisList>")
	.description(
		"PT-BR: Remove a máscara de um número de PIS. EN-US: Removes the mask from a PIS number."
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
	.action((pisList, options) => {
		const { input, output, copy } = options;
		const pisArray = InputHelper.getArrayFromInputAlternativesOrFail(pisList, {
			input,
		});

		const result = pisArray.map((pis: string) => {
			return { value: pis, unmasked: PIS.unmask(pis) };
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});
