import { TituloEleitor } from "@brasil-interface/utils";
import { program } from "commander";

import { InputHelper } from "@/helpers/input-helper";
import { OutputHelper } from "@/helpers/output-helper";

const tituloEleitor = program
	.command("titulo-eleitor")
	.description("Título de Eleitor utilities.");

tituloEleitor
	.command("validate <tituloEleitorList>")
	.description(
		"PT-BR: Valida uma lista de números de Título de Eleitor. EN-US: Validate a list of Titulo Eleitor numbers."
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
	.action((tituloEleitorList, options) => {
		const { input, output, copy } = options;
		const tituloEleitorArray = InputHelper.getArrayFromInputAlternativesOrFail(
			tituloEleitorList,
			{
				input,
			}
		);

		const result = tituloEleitorArray.map((tituloEleitor: string) => {
			return {
				value: tituloEleitor,
				isValid: TituloEleitor.isValid(tituloEleitor),
			};
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

tituloEleitor
	.command("generate")
	.description(
		"PT-BR: Gera um número de Título de Eleitor. EN-US: Generate a Titulo Eleitor number."
	)
	.option(
		"-a --amount <amount>",
		"PT-BR: Gera uma quantidade de números de Título de Eleitor. EN-US: Generate an amount of Titulo Eleitor numbers.",
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

		const tituloEleitorList: string[] = [];

		for (let i = 0; i < parseInt(amount); i++) {
			const tituloEleitor = TituloEleitor.generate();

			tituloEleitorList.push(tituloEleitor);
		}

		OutputHelper.handleResultOutputBasedOnOptions(tituloEleitorList, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

tituloEleitor
	.command("get-estado <tituloEleitorList>")
	.description(
		"PT-BR: Retorna o estado atrelados a cada número de Título de Eleitor da lista. EN-US: Returns the state associated with each Titulo Eleitor number in the list."
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
	.action((tituloEleitorList, options) => {
		const { input, output, copy } = options;
		const tituloEleitorArray = InputHelper.getArrayFromInputAlternativesOrFail(
			tituloEleitorList,
			{ input }
		);

		const result = tituloEleitorArray.map((tituloEleitor: string) => {
			return {
				value: tituloEleitor,
				estado: TituloEleitor.getEstado(tituloEleitor),
			};
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});
