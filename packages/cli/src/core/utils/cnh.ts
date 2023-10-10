import { CNH } from "@brasil-interface/utils";
import { program } from "commander";
import fs from "fs";

import { InputHelper } from "@/helpers/input-helper";

const cnh = program.command("cnh").description("CNH utilities.");

cnh
	.command("validate <cnhList>")
	.description(
		"PT-BR: Valida uma lista de números de CNH. EN-US: Validate a list of CNH numbers."
	)
	.option(
		"-i, --input <inputFile>",
		"PT-BR: Caminho do arquivo de input. EN-US: Input file path"
	)
	.option(
		"-o, --output <outputFile>",
		"PT-BR: Caminho do arquivo de output. EN-US: Output file path"
	)
	.action((cnhList, { inputFile, outputFile }) => {
		let input: string = "";
		let cnhArray: string[] | null = null;

		console.log(cnhList, inputFile, outputFile);

		if (cnhList) {
			input = cnhList;
		} else if (inputFile) {
			input = fs.readFileSync(inputFile, "utf8");
		} else {
			console.log("PT-BR: Nenhum input fornecido. EN-US: No input provided.");
			return;
		}

		cnhArray = InputHelper.getArrayFromArrayLike(input);

		const result = cnhArray.map((cnh: string) => {
			return { value: cnh, isValid: CNH.isValid(cnh) };
		});

		if (outputFile) {
			const fs = require("fs");
			fs.writeFileSync(outputFile, JSON.stringify(result));
		} else {
			console.log(result);
		}
	});

cnh
	.command("generate")
	.option(
		"-a --amount <amount>",
		"PT-BR: Gera uma quantidade de números de CNH. EN-US: Generate an amount of CNH numbers.",
		"1"
	)
	.option(
		"-o --output <output>",
		"PT-BR: Salva o resultado (array) em um arquivo JSON. EN-US: Save the result (array) in a JSON file."
	)
	.description("PT-BR: Gera um número de CNH. EN-US: Generate a CNH number.")
	.action((options) => {
		const { amount } = options;

		const cnhList: string[] = [];

		for (let i = 0; i < parseInt(amount); i++) {
			const cnh = CNH.generate();

			cnhList.push(cnh);
		}

		console.log(JSON.stringify(cnhList));

		if (options.output) {
			const fs = require("fs");

			fs.writeFileSync(options.output, JSON.stringify(cnhList));
		}
	});
