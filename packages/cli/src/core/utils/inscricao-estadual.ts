import { EstadoSigla, InscricaoEstadual } from "@brasil-interface/utils";
import { Argument, program } from "commander";

import { InputHelper } from "@/helpers/input-helper";
import { OutputHelper } from "@/helpers/output-helper";

const inscricaoEstadual = program
	.command("inscricao-estadual")
	.description("Inscrição Estadual utilities.");

const ESTADOS_STRATEGY = new Map<EstadoSigla, any>([
	["AC", InscricaoEstadual.AC],
	["AL", InscricaoEstadual.AL],
	["AP", InscricaoEstadual.AP],
	["AM", InscricaoEstadual.AM],
	["BA", InscricaoEstadual.BA],
	["CE", InscricaoEstadual.CE],
	["DF", InscricaoEstadual.DF],
	["ES", InscricaoEstadual.ES],
	["GO", InscricaoEstadual.GO],
	["MA", InscricaoEstadual.MA],
	["MT", InscricaoEstadual.MT],
	["MS", InscricaoEstadual.MS],
	["MG", InscricaoEstadual.MG],
	["PA", InscricaoEstadual.PA],
	["PB", InscricaoEstadual.PB],
	["PR", InscricaoEstadual.PR],
	["PE", InscricaoEstadual.PE],
	["PI", InscricaoEstadual.PI],
	["RJ", InscricaoEstadual.RJ],
	["RN", InscricaoEstadual.RN],
	["RS", InscricaoEstadual.RS],
	["RO", InscricaoEstadual.RO],
	["RR", InscricaoEstadual.RR],
	["SC", InscricaoEstadual.SC],
	["SP", InscricaoEstadual.SP],
	["SE", InscricaoEstadual.SE],
	["TO", InscricaoEstadual.TO],
]);

inscricaoEstadual
	.command("validate <inscricaoEstadualList>")
	.addArgument(
		new Argument("<estado>", "Estado da Inscrição Estadual.").choices(
			Array.from(ESTADOS_STRATEGY.keys())
		)
	)
	.description(
		"PT-BR: Valida um número de Inscrição Estadual. EN-US: Validate an Inscrição Estadual number."
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
	.action((inscricaoEstadualList, estado, options) => {
		const strategy = ESTADOS_STRATEGY.get(estado as EstadoSigla);

		if (!strategy) {
			throw new Error("PT-BR: Estado inválido. EN-US: Invalid state.");
		}

		const { input, output, copy } = options;
		const inscricaoEstadualArray =
			InputHelper.getArrayFromInputAlternativesOrFail(inscricaoEstadualList, {
				input,
			});

		const result = inscricaoEstadualArray.map((inscricaoEstadual: string) => {
			return {
				value: inscricaoEstadual,
				isValid: strategy.isValid(inscricaoEstadual),
			};
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

inscricaoEstadual
	.command("generate")
	.description(
		"PT-BR: Gera um número de Inscrição Estadual. EN-US: Generate an Inscrição Estadual number."
	)
	.addArgument(
		new Argument("<estado>", "Estado da Inscrição Estadual.").choices(
			Array.from(ESTADOS_STRATEGY.keys())
		)
	)
	.option(
		"-a --amount <amount>",
		"PT-BR: Gera uma quantidade de números de Inscrição Estadual. EN-US: Generate an amount of Inscrição Estadual numbers.",
		"1"
	)
	.option(
		"-m --mask",
		"PT-BR: Formata o número de Inscrição Estadual. EN-US: Mask the Inscrição Estadual number."
	)
	.option(
		"-o --output <filepath>",
		"PT-BR: Salva o resultado (array) em um arquivo JSON. EN-US: Save the result (array) in a JSON file."
	)
	.option(
		"-c, --copy",
		"PT-BR: Copia o resultado para a área de transferência. EN-US: Copy the result to the clipboard."
	)
	.action((estado, options) => {
		const { amount, mask, output, copy } = options;

		const strategy = ESTADOS_STRATEGY.get(estado as EstadoSigla);

		if (!strategy) {
			throw new Error("PT-BR: Estado inválido. EN-US: Invalid state.");
		}

		const inscricaoEstadualList: string[] = [];

		for (let i = 0; i < parseInt(amount); i++) {
			const inscricaoEstadual = mask
				? strategy.generateMasked()
				: strategy.generate();

			inscricaoEstadualList.push(inscricaoEstadual);
		}

		OutputHelper.handleResultOutputBasedOnOptions(inscricaoEstadualList, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

inscricaoEstadual
	.command("mask <inscricaoEstadualList>")
	.description(
		"PT-BR: Aplica uma máscara a um número de Inscrição Estadual. EN-US: Masks an Inscrição Estadual number."
	)
	.addArgument(
		new Argument("<estado>", "Estado da Inscrição Estadual.").choices(
			Array.from(ESTADOS_STRATEGY.keys())
		)
	)
	.option(
		"-s --sensitive",
		"PT-BR: Trata o número de Inscrição Estadual como sensível. Adicionando asteriscos no lugar de alguns caracteres. EN-US: Treat the Inscrição Estadual number as sensitive. Adding asterisks in place of some characters."
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
	.action((inscricaoEstadualList, estado, options) => {
		const strategy = ESTADOS_STRATEGY.get(estado as EstadoSigla);

		if (!strategy) {
			throw new Error("PT-BR: Estado inválido. EN-US: Invalid state.");
		}

		const { sensitive, input, output, copy } = options;
		const inscricaoEstadualArray =
			InputHelper.getArrayFromInputAlternativesOrFail(inscricaoEstadualList, {
				input,
			});

		const result = inscricaoEstadualArray.map((inscricaoEstadual: string) => {
			return {
				value: inscricaoEstadual,
				masked: sensitive
					? strategy.maskSensitive(inscricaoEstadual)
					: strategy.mask(inscricaoEstadual),
			};
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

inscricaoEstadual
	.command("unmask <inscricaoEstadualList>")
	.description(
		"PT-BR: Remove a máscara de um número de Inscrição Estadual. EN-US: Removes the mask from an Inscrição Estadual number."
	)
	.addArgument(
		new Argument("<estado>", "Estado da Inscrição Estadual.").choices(
			Array.from(ESTADOS_STRATEGY.keys())
		)
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
	.action((inscricaoEstadualList, estado, options) => {
		const strategy = ESTADOS_STRATEGY.get(estado as EstadoSigla);

		if (!strategy) {
			throw new Error("PT-BR: Estado inválido. EN-US: Invalid state.");
		}

		const { input, output, copy } = options;
		const inscricaoEstadualArray =
			InputHelper.getArrayFromInputAlternativesOrFail(inscricaoEstadualList, {
				input,
			});

		const result = inscricaoEstadualArray.map((inscricaoEstadual: string) => {
			return {
				value: inscricaoEstadual,
				masked: strategy.unmask(inscricaoEstadual),
			};
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});
