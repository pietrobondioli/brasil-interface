import { EstadoSigla, RG } from "@brasil-interface/utils";
import { Argument, program } from "commander";
import fs from "fs";

import { InputHelper } from "@/helpers/input-helper";

const rg = program.command("rg").description("RG utilities.");

const ESTADOS_STRATEGY = new Map<EstadoSigla, any>([["SP", RG.SP]]);

rg.command("validate <rg>")
	.addArgument(
		new Argument("<estado>", "Estado do RG.").choices(
			Array.from(ESTADOS_STRATEGY.keys())
		)
	)
	.description("PT-BR: Valida um número de RG. EN-US: Validate a RG number.")
	.option(
		"-i, --input <inputFile>",
		"PT-BR: Caminho do arquivo de input. EN-US: Input file path"
	)
	.option(
		"-o, --output <outputFile>",
		"PT-BR: Caminho do arquivo de output. EN-US: Output file path"
	)
	.action((rg, estado, options) => {
		const strategy = ESTADOS_STRATEGY.get(estado as EstadoSigla);

		if (!strategy) {
			throw new Error("Invalid state");
		}

		const { inputFile, outputFile } = options;
		let input: string = "";

		if (rg) {
			input = rg;
		} else if (inputFile) {
			input = fs.readFileSync(inputFile, "utf8");
		} else {
			console.log("PT-BR: Nenhum input fornecido. EN-US: No input provided.");
			return;
		}

		const rgArray: string[] = InputHelper.getArrayFromArrayLike(input);

		const result = rgArray.map((rg: string) => {
			return { value: rg, isValid: strategy.isValid(rg) };
		});

		if (outputFile) {
			fs.writeFileSync(outputFile, JSON.stringify(result));
		} else {
			console.log(result);
		}
	});

rg.command("generate")
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
		"-o --output <output>",
		"PT-BR: Salva o resultado (array) em um arquivo JSON. EN-US: Save the result (array) in a JSON file."
	)
	.description("PT-BR: Gera um número de RG. EN-US: Generate a RG number.")
	.action((estado, options) => {
		const { amount, mask } = options;

		const strategy = ESTADOS_STRATEGY.get(estado as EstadoSigla);

		if (!strategy) {
			throw new Error("Invalid state");
		}

		const rgList: string[] = [];

		for (let i = 0; i < parseInt(amount); i++) {
			const rg = mask ? strategy.generateMasked() : strategy.generate();

			rgList.push(rg);
		}

		console.log(JSON.stringify(rgList));

		if (options.output) {
			const fs = require("fs");

			fs.writeFileSync(options.output, JSON.stringify(rgList));
		}
	});

rg.command("mask <rg>")
	.addArgument(
		new Argument("<estado>", "Estado do RG.").choices(
			Array.from(ESTADOS_STRATEGY.keys())
		)
	)
	.option(
		"-s --sensitive",
		"PT-BR: Formata o número de CPF de forma sensível. EN-US: Mask the CPF number in a sensitive way."
	)
	.option(
		"-i, --input <inputFile>",
		"PT-BR: Caminho do arquivo de input. EN-US: Input file path"
	)
	.option(
		"-o, --output <outputFile>",
		"PT-BR: Caminho do arquivo de output. EN-US: Output file path"
	)
	.description(
		"PT-BR: Aplica uma máscara a um número de RG. EN-US: Masks an RG number."
	)
	.action((rg, estado, options) => {
		const strategy = ESTADOS_STRATEGY.get(estado as EstadoSigla);

		if (!strategy) {
			throw new Error("Invalid state");
		}

		const { sensitive, inputFile, outputFile } = options;

		let input: string = "";

		if (rg) {
			input = rg;
		} else if (inputFile) {
			input = fs.readFileSync(inputFile, "utf8");
		} else {
			console.log("PT-BR: Nenhum input fornecido. EN-US: No input provided.");
			return;
		}

		const rgArray: string[] = InputHelper.getArrayFromArrayLike(input);

		const result = rgArray.map((rg: string) => {
			return {
				value: rg,
				masked: sensitive ? strategy.maskSensitive(rg) : strategy.mask(rg),
			};
		});

		if (outputFile) {
			fs.writeFileSync(outputFile, JSON.stringify(result));
		} else {
			console.log(result);
		}
	});

rg.command("unmask <rg>")
	.addArgument(
		new Argument("<estado>", "Estado do RG.").choices(
			Array.from(ESTADOS_STRATEGY.keys())
		)
	)
	.description(
		"PT-BR: Remove a máscara de um número de RG. EN-US: Removes the mask from an RG number."
	)
	.option(
		"-i, --input <inputFile>",
		"PT-BR: Caminho do arquivo de input. EN-US: Input file path"
	)
	.option(
		"-o, --output <outputFile>",
		"PT-BR: Caminho do arquivo de output. EN-US: Output file path"
	)
	.action((rg, estado, options) => {
		const strategy = ESTADOS_STRATEGY.get(estado as EstadoSigla);

		if (!strategy) {
			throw new Error("Invalid state");
		}

		const { inputFile, outputFile } = options;
		let input: string = "";

		if (rg) {
			input = rg;
		} else if (inputFile) {
			input = fs.readFileSync(inputFile, "utf8");
		} else {
			console.log("PT-BR: Nenhum input fornecido. EN-US: No input provided.");
			return;
		}

		const rgArray: string[] = InputHelper.getArrayFromArrayLike(input);

		const result = rgArray.map((rg: string) => {
			return {
				value: rg,
				masked: strategy.unmask(rg),
			};
		});

		if (outputFile) {
			fs.writeFileSync(outputFile, JSON.stringify(result));
		} else {
			console.log(result);
		}
	});
