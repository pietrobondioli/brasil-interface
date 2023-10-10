import { PIS } from "@brasil-interface/utils";
import { program } from "commander";
import fs from "fs";

import { InputHelper } from "@/helpers/input-helper";

const pis = program.command("pis").description("PIS utilities.");

pis
	.command("validate <pis>")
	.description(
		"PT-BR: Valida uma lista de números de PIS. EN-US: Validate a list of PIS numbers."
	)
	.option(
		"-i, --input <inputFile>",
		"PT-BR: Caminho do arquivo de input. EN-US: Input file path"
	)
	.option(
		"-o, --output <outputFile>",
		"PT-BR: Caminho do arquivo de output. EN-US: Output file path"
	)
	.action((pisList, options) => {
		const { inputFile, outputFile } = options;

		let input: string = "";
		let pisArray: string[] = [];

		if (pisList) {
			input = pisList;
		} else if (inputFile) {
			input = fs.readFileSync(inputFile, "utf8");
		} else {
			console.log("PT-BR: Nenhum input fornecido. EN-US: No input provided.");
			return;
		}

		pisArray = InputHelper.getArrayFromArrayLike(input);

		const result = pisArray.map((pis: string) => {
			return { value: pis, isValid: PIS.isValid(pis) };
		});

		if (outputFile) {
			const fs = require("fs");
			fs.writeFileSync(outputFile, JSON.stringify(result));
		} else {
			console.log(result);
		}
	});

pis
	.command("generate")
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
		"-o --output <output>",
		"PT-BR: Salva o resultado (array) em um arquivo JSON. EN-US: Save the result (array) in a JSON file."
	)
	.description("PT-BR: Gera um número de PIS. EN-US: Generate a PIS number.")
	.action((options) => {
		const { amount, mask } = options;

		const pisList: string[] = [];

		for (let i = 0; i < parseInt(amount); i++) {
			const pis = mask ? PIS.generateMasked() : PIS.generate();

			pisList.push(pis);
		}

		console.log(JSON.stringify(pisList));

		if (options.output) {
			const fs = require("fs");

			fs.writeFileSync(options.output, JSON.stringify(pisList));
		}
	});

pis
	.command("mask <pis>")
	.description("PT-BR: Formata um número de PIS. EN-US: Mask a PIS number.")
	.option(
		"-s --sensitive",
		"PT-BR: Formata o número de PIS de forma sensível. EN-US: Mask the PIS number in a sensitive way."
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
	.action((pis, options) => {
		const { sensitive, inputFile, outputFile } = options;

		let input: string = "";
		let pisArray: string[] = [];

		if (pis) {
			input = pis;
		} else if (inputFile) {
			input = fs.readFileSync(inputFile, "utf8");
		} else {
			console.log("PT-BR: Nenhum input fornecido. EN-US: No input provided.");
			return;
		}

		pisArray = InputHelper.getArrayFromArrayLike(input);

		const result = pisArray.map((pis: string) => {
			return {
				value: pis,
				masked: sensitive ? PIS.maskSensitive(pis) : PIS.mask(pis),
			};
		});

		if (outputFile) {
			const fs = require("fs");
			fs.writeFileSync(outputFile, JSON.stringify(result));
		} else {
			console.log(result);
		}
	});

pis
	.command("unmask <pis>")
	.description(
		"PT-BR: Remove a máscara de um número de PIS. EN-US: Removes the mask from a PIS number."
	)
	.option(
		"-i, --input <inputFile>",
		"PT-BR: Caminho do arquivo de input. EN-US: Input file path"
	)
	.option(
		"-o, --output <outputFile>",
		"PT-BR: Caminho do arquivo de output. EN-US: Output file path"
	)
	.action((pis, options) => {
		const { inputFile, outputFile } = options;

		let input: string = "";
		let pisArray: string[] = [];

		if (pis) {
			input = pis;
		} else if (inputFile) {
			input = fs.readFileSync(inputFile, "utf8");
		} else {
			console.log("PT-BR: Nenhum input fornecido. EN-US: No input provided.");
			return;
		}

		pisArray = InputHelper.getArrayFromArrayLike(input);

		const result = pisArray.map((pis: string) => {
			return { value: pis, unmasked: PIS.unmask(pis) };
		});

		if (outputFile) {
			const fs = require("fs");
			fs.writeFileSync(outputFile, JSON.stringify(result));
		} else {
			console.log(result);
		}
	});
