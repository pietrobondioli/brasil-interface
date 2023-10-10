import { CNPJ } from "@brasil-interface/utils";
import { program } from "commander";
import fs from "fs";

import { InputHelper } from "@/helpers/input-helper";

const cnpj = program.command("cnpj").description("CNPF utilities.");

cnpj
	.command("validate <cnpjList>")
	.option(
		"-i, --input <inputFile>",
		"PT-BR: Caminho do arquivo de input. EN-US: Input file path"
	)
	.option(
		"-o, --output <outputFile>",
		"PT-BR: Caminho do arquivo de output. EN-US: Output file path"
	)
	.description(
		"PT-BR: Valida uma lista de números de CNPJ. EN-US: Validate a list of CNPJ numbers."
	)
	.action((cnpjList, options) => {
		const { inputFile, outputFile } = options;

		let input: string = "";
		let cnpjArray: string[] = [];

		if (cnpjList) {
			input = cnpjList;
		} else if (inputFile) {
			input = fs.readFileSync(inputFile, "utf8");
		} else {
			console.log("PT-BR: Nenhum input fornecido. EN-US: No input provided.");
			return;
		}

		cnpjArray = InputHelper.getArrayFromArrayLike(input);

		const result = cnpjArray.map((cnpj: string) => {
			return { value: cnpj, isValid: CNPJ.isValid(cnpj) };
		});

		if (outputFile) {
			const fs = require("fs");
			fs.writeFileSync(outputFile, JSON.stringify(result));
		} else {
			console.log(result);
		}
	});

cnpj
	.command("generate")
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
		"-o --output <output>",
		"PT-BR: Salva o resultado (array) em um arquivo JSON. EN-US: Save the result (array) in a JSON file."
	)
	.description("PT-BR: Gera um número de CNPJ. EN-US: Generate a CNPJ number.")
	.action((options) => {
		const { amount, mask } = options;

		const cnpjList: string[] = [];

		for (let i = 0; i < parseInt(amount); i++) {
			const cnpj = mask ? CNPJ.generateMasked() : CNPJ.generate();

			cnpjList.push(cnpj);
		}

		console.log(JSON.stringify(cnpjList));

		if (options.output) {
			const fs = require("fs");

			fs.writeFileSync(options.output, JSON.stringify(cnpjList));
		}
	});

cnpj
	.command("mask <cnpjList>")
	.option(
		"-i, --input <inputFile>",
		"PT-BR: Caminho do arquivo de input. EN-US: Input file path"
	)
	.option(
		"-o, --output <outputFile>",
		"PT-BR: Caminho do arquivo de output. EN-US: Output file path"
	)
	.option(
		"-s --sensitive",
		"PT-BR: Formata o número de CNPJ de forma sensível. EN-US: Mask the CNPJ number in a sensitive way."
	)
	.description(
		"PT-BR: Formata uma lista de números de CNPJ. EN-US: Mask a list of CNPJ numbers."
	)
	.action((cnpjList, options) => {
		const { sensitive, inputFile, outputFile } = options;

		let input: string = "";
		let cnpjArray: string[] = [];

		if (cnpjList) {
			input = cnpjList;
		} else if (inputFile) {
			input = fs.readFileSync(inputFile, "utf8");
		} else {
			console.log("PT-BR: Nenhum input fornecido. EN-US: No input provided.");
			return;
		}

		cnpjArray = InputHelper.getArrayFromArrayLike(input);

		const result = cnpjArray.map((cnpj: string) => {
			return {
				value: cnpj,
				masked: sensitive ? CNPJ.maskSensitive(cnpj) : CNPJ.mask(cnpj),
			};
		});

		if (outputFile) {
			const fs = require("fs");
			fs.writeFileSync(outputFile, JSON.stringify(result));
		} else {
			console.log(result);
		}
	});

cnpj
	.command("unmask <cnpjList>")
	.option(
		"-i, --input <inputFile>",
		"PT-BR: Caminho do arquivo de input. EN-US: Input file path"
	)
	.option(
		"-o, --output <outputFile>",
		"PT-BR: Caminho do arquivo de output. EN-US: Output file path"
	)
	.description(
		"PT-BR: Remove a máscara de um número de CNPJ. EN-US: Unmask a CNPJ number."
	)
	.action((cnpjList, options) => {
		const { inputFile, outputFile } = options;

		let input: string = "";
		let cnpjArray: string[] = [];

		if (cnpjList) {
			input = cnpjList;
		} else if (inputFile) {
			input = fs.readFileSync(inputFile, "utf8");
		} else {
			console.log("PT-BR: Nenhum input fornecido. EN-US: No input provided.");
			return;
		}

		cnpjArray = InputHelper.getArrayFromArrayLike(input);

		const result = cnpjArray.map((cnpj: string) => {
			return { value: cnpj, unmasked: CNPJ.unmask(cnpj) };
		});

		if (outputFile) {
			const fs = require("fs");
			fs.writeFileSync(outputFile, JSON.stringify(result));
		} else {
			console.log(result);
		}
	});
