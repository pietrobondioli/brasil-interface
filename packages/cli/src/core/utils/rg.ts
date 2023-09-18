import { EstadoSigla, RG } from "@brasil-interface/utils";
import { Argument, program } from "commander";

const rg = program.command("rg").description("RG utilities.");

const ESTADOS_STRATEGY = new Map<EstadoSigla, any>([["SP", RG.SP]]);

rg.command("validate <rg>")
	.addArgument(
		new Argument("<estado>", "Estado do RG.").choices(
			Array.from(ESTADOS_STRATEGY.keys())
		)
	)
	.description("PT-BR: Valida um número de RG. EN-US: Validate a RG number.")
	.action((rg, estado) => {
		const strategy = ESTADOS_STRATEGY.get(estado as EstadoSigla);

		if (!strategy) {
			throw new Error("Invalid state");
		}

		const isValid = strategy.isValid(rg);

		console.log(isValid);
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

		console.log(`RG Generator:`);

		const rgs: string[] = [];

		for (let i = 0; i < parseInt(amount); i++) {
			const rg = mask ? strategy.generateMasked() : strategy.generate();

			rgs.push(rg);

			console.log(`RG ${i + 1}: ${rg}`);
		}

		if (options.output) {
			const fs = require("fs");

			fs.writeFileSync(options.output, JSON.stringify(rgs));
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
	.description(
		"PT-BR: Aplica uma máscara a um número de RG. EN-US: Masks an RG number."
	)
	.action((rg, estado, options) => {
		const strategy = ESTADOS_STRATEGY.get(estado as EstadoSigla);

		if (!strategy) {
			throw new Error("Invalid state");
		}

		const masked = options.sensitive
			? strategy.maskSensitive(rg)
			: strategy.mask(rg);

		console.log(masked);
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
	.action((rg, estado) => {
		const strategy = ESTADOS_STRATEGY.get(estado as EstadoSigla);

		if (!strategy) {
			throw new Error("Invalid state");
		}

		const unmasked = strategy.unmask(rg);

		console.log(unmasked);
	});
