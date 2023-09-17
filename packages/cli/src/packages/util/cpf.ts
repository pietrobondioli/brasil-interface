import { program } from "commander";
import { CPF } from "@brasil-interface/utils";

const cpf = program.command("cpf").description("CPF utilities.");

cpf
	.command("generate")
	.description("Generate a random CPF number.")
	.action(() => {
		console.log("CPF Generator");

		console.log(CPF.generate());
	});
