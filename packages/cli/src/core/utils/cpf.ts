import { CPF } from "@brasil-interface/utils";
import { program } from "commander";

import { InputHelper } from "@/helpers/input-helper";
import { OutputHelper } from "@/helpers/output-helper";

const cpf = program.command("cpf").description("CPF utilities.");

cpf
	.command("validate <cpfList>")
	.description(
		"PT-BR: Valida uma lista de números de CPF. EN-US: Validate a list of CPF numbers."
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
	.action((cpfList, options) => {
		const { input, output, copy } = options;
		const cpfArray = InputHelper.getArrayFromInputAlternativesOrFail(cpfList, {
			input,
		});

		const result = cpfArray.map((cpf: string) => {
			return { value: cpf, isValid: CPF.isValid(cpf) };
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

cpf
	.command("generate")
	.description("PT-BR: Gera um número de CPF. EN-US: Generate a CPF number.")
	.option(
		"-a --amount <amount>",
		"PT-BR: Gera uma quantidade de números de CPF. EN-US: Generate an amount of CPF numbers.",
		"1"
	)
	.option(
		"-m --mask",
		"PT-BR: Formata o número de CPF. EN-US: Mask the CPF number."
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

		const cpfList: string[] = [];

		for (let i = 0; i < parseInt(amount); i++) {
			const cpf = mask ? CPF.generateMasked() : CPF.generate();

			cpfList.push(cpf);
		}

		OutputHelper.handleResultOutputBasedOnOptions(cpfList, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

cpf
	.command("mask <cpfList>")
	.description(
		"PT-BR: Formata uma lista de números de CPF. EN-US: Mask a list of CPF numbers."
	)
	.option(
		"-s --sensitive",
		"PT-BR: Trata o número de CPF como sensível. Adicionando asteriscos no lugar de alguns dígitos. EN-US: Treat the CPF number as sensitive. Adding asterisks in place of some digits."
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
	.action((cpfList, options) => {
		const { sensitive, input, output, copy } = options;
		const cpfArray = InputHelper.getArrayFromInputAlternativesOrFail(cpfList, {
			input,
		});

		const result = cpfArray.map((cpf: string) => {
			return {
				value: cpf,
				masked: sensitive ? CPF.maskSensitive(cpf) : CPF.mask(cpf),
			};
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

cpf
	.command("unmask <cpfList>")
	.description(
		"PT-BR: Remove a formatação de uma lista de números de CPF. EN-US: Unmask a list of CPF numbers."
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
	.action((cpfList, options) => {
		const { input, output, copy } = options;
		const cpfArray = InputHelper.getArrayFromInputAlternativesOrFail(cpfList, {
			input,
		});

		const result = cpfArray.map((cpf: string) => {
			return { value: cpf, unmasked: CPF.unmask(cpf) };
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

cpf
	.command("get-estados <cpfList>")
	.description(
		"PT-BR: Retorna os estados atrelados a uma lista de números de CPF. EN-US: Returns the states linked to a list of CPF numbers."
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
	.action((cpfList, options) => {
		const { input, output, copy } = options;
		const cpfArray = InputHelper.getArrayFromInputAlternativesOrFail(cpfList, {
			input,
		});

		const result = cpfArray.map((cpf: string) => {
			return { value: cpf, estado: CPF.getEstado(cpf) };
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});
