import { Logger } from "@/helpers/logger";
import { OutputHelper } from "@/helpers/output-helper";
import { BrasilApi } from "@brasil-interface/sdks";
import { program } from "commander";

const brasilApiISBN = program
	.command("brasil-api/isbn")
	.description("Brasil API ISBN SDK");

brasilApiISBN
	.command("get-livro <isbn> [providers]")
	.description("Get information about a book by its ISBN.")
	.option("-o, --output <filepath>", "Output file path")
	.option("-c, --copy", "Copy the result to the clipboard.")
	.option("-d, --debug", "Show debug information.")
	.action(async (isbn, providers, options) => {
		const { output, copy, debug } = options;
		const logger = new Logger(debug);
		const ISBN = new BrasilApi.ISBN();

		try {
			const result = await ISBN.getLivro(isbn, providers);

			OutputHelper.handleResultOutputBasedOnOptions(result, {
				output,
				copyToClipboard: copy,
			});
		} catch (error) {
			logger.info(
				`PT-BR: Não foi possível obter informações sobre o livro com ISBN ${isbn}.`
			);
			logger.info(
				`EN: Couldn't get information about the book with ISBN ${isbn}.`
			);
			logger.error(error);
		}
	});
