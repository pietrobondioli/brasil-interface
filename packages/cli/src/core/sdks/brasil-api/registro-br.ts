// ... other imports
import { program } from "commander";

const brasilApiRegistroBR = program
	.command("brasil-api/registrobr")
	.description("Brasil API RegistroBR SDK");

brasilApiRegistroBR
	.command("get-domain-info <domain>")
	.description("Evaluates the status of a .br domain.")
	.option("-o, --output <filepath>", "Output file path")
	.option("-c, --copy", "Copy the result to the clipboard.")
	.option("-d, --debug", "Show debug information.")
	.action(async (domain, options) => {
		// ... similar structure to previous CLI implementations
	});

// Ensure to parse the process.argv to initiate the commander program
program.parse(process.argv);
