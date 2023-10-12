import { EstadoSigla, RG } from "@brasil-interface/utils";
import { Argument, program } from "commander";

import { InputHelper } from "@/helpers/input-helper";
import { OutputHelper } from "@/helpers/output-helper";

const rg = program.command("rg").description("RG utilities.");

const ESTADOS_STRATEGY = new Map<EstadoSigla, any>([["SP", RG.SP]]);

rg.command("validate <rgList>")
	.description("PT-BR: Valida um número de RG. EN-US: Validate a RG number.")
	.addArgument(
		new Argument("<estado>", "Estado do RG.").choices(
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
	.action((rgList, estado, options) => {
		const strategy = ESTADOS_STRATEGY.get(estado as EstadoSigla);

		if (!strategy) {
			throw new Error("PT-BR: Estado inválido. EN-US: Invalid state.");
		}

		const { input, output, copy } = options;
		const rgArray = InputHelper.getArrayFromInputAlternativesOrFail(rgList, {
			input,
		});

		const result = rgArray.map((rg: string) => {
			return { value: rg, isValid: strategy.isValid(rg) };
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

rg.command("generate")
	.description("PT-BR: Gera um número de RG. EN-US: Generate a RG number.")
	.addArgument(
		new Argument("<estado>", "Estado do RG.").choices(
			Array.from(ESTADOS_STRATEGY.keys())
		)
	)
	.option(
		"-a --amount <amount>",
		"PT-BR: Gera uma quantidade de números de RG. EN-US: Generate an amount of RG numbers.",
		"1"
	)
	.option(
		"-m --mask",
		"PT-BR: Formata o número de RG. EN-US: Mask the RG number."
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

		const rgList: string[] = [];

		for (let i = 0; i < parseInt(amount); i++) {
			const rg = mask ? strategy.generateMasked() : strategy.generate();

			rgList.push(rg);
		}

		OutputHelper.handleResultOutputBasedOnOptions(rgList, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

rg.command("mask <rgList>")
	.description(
		"PT-BR: Aplica uma máscara a um número de RG. EN-US: Masks an RG number."
	)
	.addArgument(
		new Argument("<estado>", "Estado do RG.").choices(
			Array.from(ESTADOS_STRATEGY.keys())
		)
	)
	.option(
		"-s --sensitive",
		"PT-BR: Trata o número de RG como sensível. Adicionando asteriscos no lugar de alguns caracteres. EN-US: Treat the RG number as sensitive. Adding asterisks in place of some characters."
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
	.action((rgList, estado, options) => {
		const strategy = ESTADOS_STRATEGY.get(estado as EstadoSigla);

		if (!strategy) {
			throw new Error("PT-BR: Estado inválido. EN-US: Invalid state.");
		}

		const { sensitive, input, output, copy } = options;
		const rgArray = InputHelper.getArrayFromInputAlternativesOrFail(rgList, {
			input,
		});

		const result = rgArray.map((rg: string) => {
			return {
				value: rg,
				masked: sensitive ? strategy.maskSensitive(rg) : strategy.mask(rg),
			};
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});

rg.command("unmask <rgList>")
	.description(
		"PT-BR: Remove a máscara de um número de RG. EN-US: Removes the mask from an RG number."
	)
	.addArgument(
		new Argument("<estado>", "Estado do RG.").choices(
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
	.action((rgList, estado, options) => {
		const strategy = ESTADOS_STRATEGY.get(estado as EstadoSigla);

		if (!strategy) {
			throw new Error("PT-BR: Estado inválido. EN-US: Invalid state.");
		}

		const { input, output, copy } = options;
		const rgArray = InputHelper.getArrayFromInputAlternativesOrFail(rgList, {
			input,
		});

		const result = rgArray.map((rg: string) => {
			return {
				value: rg,
				masked: strategy.unmask(rg),
			};
		});

		OutputHelper.handleResultOutputBasedOnOptions(result, {
			output,
			isJson: true,
			copyToClipboard: copy,
		});
	});
