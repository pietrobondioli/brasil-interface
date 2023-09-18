import { program } from "commander";
import { PIS } from "@brasil-interface/utils";

const pis = program.command("pis").description("PIS utilities.");

pis
	.command("validate <pis>")
	.description("PT-BR: Valida um número de PIS. EN-US: Validate a PIS number.")
	.action((pis) => {
		console.log(`PIS: ${pis}. Result: ${PIS.isValid(pis)}`);
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

		console.log(`PIS Generator:`);

		const cpfs: string[] = [];

		for (let i = 0; i < parseInt(amount); i++) {
			const pis = mask ? PIS.generateMasked() : PIS.generate();

			cpfs.push(pis);

			console.log(`PIS ${i + 1}: ${pis}`);
		}

		if (options.output) {
			const fs = require("fs");

			fs.writeFileSync(options.output, JSON.stringify(cpfs));
		}
	});

pis
	.command("mask <pis>")
	.option(
		"-s --sensitive",
		"PT-BR: Formata o número de PIS de forma sensível. EN-US: Mask the PIS number in a sensitive way."
	)
	.description("PT-BR: Formata um número de PIS. EN-US: Mask a PIS number.")
	.action((pis, options) => {
		const { sensitive } = options;

		if (sensitive) {
			console.log(`PIS Mask: ${PIS.maskSensitive(pis)}`);
		} else {
			console.log(`PIS Mask: ${PIS.mask(pis)}`);
		}
	});

pis
	.command("unmask <pis>")
	.description(
		"PT-BR: Remove a máscara de um número de PIS. EN-US: Removes the mask from a PIS number."
	)
	.action((pis) => {
		console.log(`PIS Unmask: ${PIS.unmask(pis)}`);
	});
