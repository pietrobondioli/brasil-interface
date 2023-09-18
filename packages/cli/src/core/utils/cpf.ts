import { program } from "commander";
import { CPF } from "@brasil-interface/utils";

const cpf = program.command("cpf").description("CPF utilities.");

cpf
	.command("validate <cpf>")
	.description("PT-BR: Valida um número de CPF. EN-US: Validate a CPF number.")
	.action((cpf) => {
		console.log(`CPF Validator: ${cpf}. Result: ${CPF.isValid(cpf)}`);
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

		console.log(`CPF Generator:`);

		const cpfs: string[] = [];

		for (let i = 0; i < parseInt(amount); i++) {
			const cpf = mask ? CPF.generateMasked() : CPF.generate();

			cpfs.push(cpf);

			console.log(`CPF ${i + 1}: ${cpf}`);
		}

		if (options.output) {
			const fs = require("fs");

			fs.writeFileSync(options.output, JSON.stringify(cpfs));
		}
	});

cpf
	.command("mask <cpf>")
	.option(
		"-s --sensitive",
		"PT-BR: Formata o número de CPF de forma sensível. EN-US: Mask the CPF number in a sensitive way."
	)
	.description("PT-BR: Formata um número de CPF. EN-US: Mask a CPF number.")
	.action((cpf, options) => {
		const { sensitive } = options;

		if (sensitive) {
			console.log(`CPF Mask: ${CPF.maskSensitive(cpf)}`);
		} else {
			console.log(`CPF Mask: ${CPF.mask(cpf)}`);
		}
	});

cpf
	.command("unmask <cpf>")
	.description(
		"PT-BR: Remove a formatação de um número de CPF. EN-US: Unmask a CPF number."
	)
	.action((cpf) => {
		console.log(`CPF Unmask: ${CPF.unmask(cpf)}`);
	});

cpf
	.command("get-estados <cpf>")
	.description(
		"PT-BR: Retorna os estados atrelados ao número de CPF. EN-US: Returns the states linked to the CPF number."
	)
	.action((cpf) => {
		console.log(`CPF States: ${CPF.getEstado(cpf)}`);
	});
