import { CNPJ } from "@brasil-interface/utils";
import { program } from "commander";

import { InputHelper } from "@/helpers/input-helper";
import { OutputHelper } from "@/helpers/output-helper";

const cnpj = program.command("cnpj").description("CNPF utilities.");

cnpj
	.command("validate <cnpjList>")
	.description(
		"PT-BR: Valida uma lista de números de CNPJ. EN-US: Validate a list of CNPJ numbers."
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
	.action((cnpjList, options) => {
		const { input, output, copy } = options;
		const cnpjArray = InputHelper.getArrayFromInputAlternativesOrFail(
			cnpjList,
			{ input }
		);

		const result = cnpjArray.map((cnpj: string) => {
			return { value: cnpj, isValid: CNPJ.isValid(cnpj) };
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

cnpj
	.command("generate")
	.description("PT-BR: Gera um número de CNPJ. EN-US: Generate a CNPJ number.")
	.option(
		"-a --amount <amount>",
		"PT-BR: Gera uma quantidade de números de CNPJ. EN-US: Generate an amount of CNPJ numbers.",
		"1"
	)
	.option(
		"-m --mask",
		"PT-BR: Formata o número de CNPJ. EN-US: Mask the CNPJ number."
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

		const cnpjList: string[] = [];

		for (let i = 0; i < parseInt(amount); i++) {
			const cnpj = mask ? CNPJ.generateMasked() : CNPJ.generate();

			cnpjList.push(cnpj);
		}

		OutputHelper.handleResultOutputBasedOnOptions(cnpjList, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

cnpj
	.command("mask <cnpjList>")
	.description(
		"PT-BR: Formata uma lista de números de CNPJ. EN-US: Mask a list of CNPJ numbers."
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
		"-s --sensitive",
		"PT-BR: Formata o número de CNPJ de forma sensível. EN-US: Mask the CNPJ number in a sensitive way."
	)
	.option(
		"-c, --copy",
		"PT-BR: Copia o resultado para a área de transferência. EN-US: Copy the result to the clipboard."
	)
	.action((cnpjList, options) => {
		const { sensitive, input, output, copy } = options;
		const cnpjArray = InputHelper.getArrayFromInputAlternativesOrFail(
			cnpjList,
			{ input }
		);

		const result = cnpjArray.map((cnpj: string) => {
			return {
				value: cnpj,
				masked: sensitive ? CNPJ.maskSensitive(cnpj) : CNPJ.mask(cnpj),
			};
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

cnpj
	.command("unmask <cnpjList>")
	.description(
		"PT-BR: Remove a máscara de um número de CNPJ. EN-US: Unmask a CNPJ number."
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
	.action((cnpjList, options) => {
		const { input, output, copy } = options;
		const cnpjArray = InputHelper.getArrayFromInputAlternativesOrFail(
			cnpjList,
			{ input }
		);

		const result = cnpjArray.map((cnpj: string) => {
			return { value: cnpj, unmasked: CNPJ.unmask(cnpj) };
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});
