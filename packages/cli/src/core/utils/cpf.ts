import { CPF } from "@brasil-interface/utils";
import { program } from "commander";
import fs from "fs";

import { InputHelper } from "@/helpers/input-helper";

const cpf = program.command("cpf").description("CPF utilities.");

cpf
	.command("validate <cpfList>")
	.description(
		"PT-BR: Valida uma lista de números de CPF. EN-US: Validate a list of CPF numbers."
	)
	.option(
		"-i, --input <inputFile>",
		"PT-BR: Caminho do arquivo de input. EN-US: Input file path"
	)
	.option(
		"-o, --output <outputFile>",
		"PT-BR: Caminho do arquivo de output. EN-US: Output file path"
	)
	.action((cpfList, options) => {
		const { inputFile, outputFile } = options;
		let input: string = "";
		let cpfArray: string[] = [];

		console.log(cpfList, inputFile, outputFile);

		if (cpfList) {
			input = cpfList;
		} else if (inputFile) {
			input = fs.readFileSync(inputFile, "utf8");
		} else {
			console.log("PT-BR: Nenhum input fornecido. EN-US: No input provided.");
			return;
		}

		cpfArray = InputHelper.getArrayFromArrayLike(input);

		const result = cpfArray.map((cpf: string) => {
			return { value: cpf, isValid: CPF.isValid(cpf) };
		});

		if (outputFile) {
			const fs = require("fs");
			fs.writeFileSync(outputFile, JSON.stringify(result));
		} else {
			console.log(result);
		}
	});

cpf
	.command("generate")
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
		"-o --output <output>",
		"PT-BR: Salva o resultado (array) em um arquivo JSON. EN-US: Save the result (array) in a JSON file."
	)
	.description("PT-BR: Gera um número de CPF. EN-US: Generate a CPF number.")
	.action((options) => {
		const { amount, mask } = options;

		const cpfList: string[] = [];

		for (let i = 0; i < parseInt(amount); i++) {
			const cpf = mask ? CPF.generateMasked() : CPF.generate();

			cpfList.push(cpf);
		}

		console.log(JSON.stringify(cpfList));

		if (options.output) {
			fs.writeFileSync(options.output, JSON.stringify(cpfList));
		}
	});

cpf
	.command("mask <cpfList>")
	.description(
		"PT-BR: Formata uma lista de números de CPF. EN-US: Mask a list of CPF numbers."
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
	.action((cpfList, options) => {
		const { sensitive, inputFile, outputFile } = options;

		let input: string = "";
		let cpfArray: string[] = [];

		if (cpfList) {
			input = cpfList;
		} else if (inputFile) {
			input = fs.readFileSync(inputFile, "utf8");
		} else {
			console.log("PT-BR: Nenhum input fornecido. EN-US: No input provided.");
			return;
		}

		cpfArray = InputHelper.getArrayFromArrayLike(input);

		const result = cpfArray.map((cpf: string) => {
			return {
				value: cpf,
				masked: sensitive ? CPF.maskSensitive(cpf) : CPF.mask(cpf),
			};
		});

		if (outputFile) {
			fs.writeFileSync(outputFile, JSON.stringify(result));
		} else {
			console.log(result);
		}
	});

cpf
	.command("unmask <cpfList>")
	.description(
		"PT-BR: Remove a formatação de uma lista de números de CPF. EN-US: Unmask a list of CPF numbers."
	)
	.option(
		"-i, --input <inputFile>",
		"PT-BR: Caminho do arquivo de input. EN-US: Input file path"
	)
	.option(
		"-o, --output <outputFile>",
		"PT-BR: Caminho do arquivo de output. EN-US: Output file path"
	)
	.action((cpfList, options) => {
		const { inputFile, outputFile } = options;

		let input: string = "";
		let cpfArray: string[] = [];

		if (cpfList) {
			input = cpfList;
		} else if (inputFile) {
			input = fs.readFileSync(inputFile, "utf8");
		} else {
			console.log("PT-BR: Nenhum input fornecido. EN-US: No input provided.");
			return;
		}

		cpfArray = InputHelper.getArrayFromArrayLike(input);

		const result = cpfArray.map((cpf: string) => {
			return { value: cpf, unmasked: CPF.unmask(cpf) };
		});

		if (outputFile) {
			fs.writeFileSync(outputFile, JSON.stringify(result));
		} else {
			console.log(result);
		}
	});

cpf
	.command("get-estados <cpfList>")
	.option(
		"-i, --input <inputFile>",
		"PT-BR: Caminho do arquivo de input. EN-US: Input file path"
	)
	.option(
		"-o, --output <outputFile>",
		"PT-BR: Caminho do arquivo de output. EN-US: Output file path"
	)
	.description(
		"PT-BR: Retorna os estados atrelados a uma lista de números de CPF. EN-US: Returns the states linked to a list of CPF numbers."
	)
	.action((cpfList, options) => {
		const { inputFile, outputFile } = options;

		let input: string = "";
		let cpfArray: string[] = [];

		if (cpfList) {
			input = cpfList;
		} else if (inputFile) {
			input = fs.readFileSync(inputFile, "utf8");
		} else {
			console.log("PT-BR: Nenhum input fornecido. EN-US: No input provided.");
			return;
		}

		cpfArray = InputHelper.getArrayFromArrayLike(input);

		const result = cpfArray.map((cpf: string) => {
			return { value: cpf, estado: CPF.getEstado(cpf) };
		});

		if (outputFile) {
			fs.writeFileSync(outputFile, JSON.stringify(result));
		} else {
			console.log(result);
		}
	});
