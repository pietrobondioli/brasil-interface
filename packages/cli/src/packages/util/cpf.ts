import { program } from "commander";

program
	.command("cpf <cpf>")
	.description("Valida um CPF")
	.action((cpf) => {
		console.log("CPF", cpf);
	});
