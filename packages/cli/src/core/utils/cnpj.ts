import { program } from "commander";
import { CNPJ } from "@brasil-interface/utils";

const cnpj = program.command("cnpj").description("CNPF utilities.");

cnpj
	.command("validate <cnpj>")
	.description(
		"PT-BR: Valida um número de CNPJ. EN-US: Validate a CNPJ number."
	)
	.action((cnpj) => {
		console.log(`CNPJ Validator: ${cnpj}. Result: ${CNPJ.isValid(cnpj)}`);
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

		console.log(`CNPJ Generator:`);

		const cpfs: string[] = [];

		for (let i = 0; i < parseInt(amount); i++) {
			const cnpj = mask ? CNPJ.generateMasked() : CNPJ.generate();

			cpfs.push(cnpj);

			console.log(`CNPJ ${i + 1}: ${cnpj}`);
		}

		if (options.output) {
			const fs = require("fs");

			fs.writeFileSync(options.output, JSON.stringify(cpfs));
		}
	});

cnpj
	.command("mask <cnpj>")
	.option(
		"-s --sensitive",
		"PT-BR: Formata o número de CNPJ de forma sensível. EN-US: Mask the CNPJ number in a sensitive way."
	)
	.description("PT-BR: Formata um número de CNPJ. EN-US: Mask a CNPJ number.")
	.action((cnpj, options) => {
		const { sensitive } = options;

		if (sensitive) {
			console.log(`CNPJ Masked: ${CNPJ.maskSensitive(cnpj)}`);
		} else {
			console.log(`CNPJ Masked: ${CNPJ.mask(cnpj)}`);
		}
	});

cnpj
	.command("unmask <cnpj>")
	.description(
		"PT-BR: Remove a máscara de um número de CNPJ. EN-US: Unmask a CNPJ number."
	)
	.action((cnpj) => {
		console.log(`CNPJ: ${cnpj}. Result: ${CNPJ.unmask(cnpj)}`);
	});
