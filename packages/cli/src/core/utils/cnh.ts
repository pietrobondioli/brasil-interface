import { program } from "commander";
import { CNH } from "@brasil-interface/utils";

const cnh = program.command("cnh").description("CNH utilities.");

cnh
	.command("validate <cnh>")
	.description("PT-BR: Valida um número de CNH. EN-US: Validate a CNH number.")
	.action((cnh) => {
		console.log(`CNH: ${cnh}. Result: ${CNH.isValid(cnh)}`);
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
		const { amount, mask } = options;

		console.log(`CNH Generator:`);

		const cnhs: string[] = [];

		for (let i = 0; i < parseInt(amount); i++) {
			const cnh = CNH.generate();

			cnhs.push(cnh);

			console.log(`CNH ${i + 1}: ${cnh}`);
		}

		if (options.output) {
			const fs = require("fs");

			fs.writeFileSync(options.output, JSON.stringify(cnhs));
		}
	});
