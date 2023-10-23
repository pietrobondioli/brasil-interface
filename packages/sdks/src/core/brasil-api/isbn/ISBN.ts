import { FetchJson } from "@/helpers/fetch-json";
import { BRASIL_API_URL } from "../constants";
import { ISBNInfo } from "./ISBN.types";

export class ISBN {
	private readonly http = new FetchJson(`${BRASIL_API_URL}/isbn`);

	/**
	 * PT-BR: Retorna informações sobre um livro a partir do ISBN.
	 * EN-US: Returns information about a book from its ISBN.
	 *
	 * @param isbn PT-BR: O código ISBN do livro. EN-US: The ISBN code of the book.
	 * @param providers PT-BR: Lista de provedores separados por vírgula. EN-US: List of providers separated by commas.
	 * @returns PT-BR: Um objeto contendo informações sobre o livro. EN-US: An object containing information about the book.
	 *
	 * @example
	 * ```typescript
	 * const ISBNApi = new BrasilApi.ISBNApi();
	 *
	 * const livro = await ISBNApi.getLivro("9788545702870", "cbl,mercado-editorial");
	 *
	 * console.log(livro);
	 * // {
	 * //   "isbn": "9788545702870",
	 * //   "title": "Akira",
	 * //   "subtitle": null,
	 * //   "authors": [
	 * //     "KATSUHIRO OTOMO",
	 * //     "DRIK SADA",
	 * //     "CASSIUS MEDAUAR",
	 * //     "MARCELO DEL GRECO",
	 * //     "DENIS TAKATA"
	 * //   ],
	 * //   "publisher": "Japorama Editora e Comunicação",
	 * //   "synopsis": "Um dos marcos da ficção científica oriental que revolucionou a chegada dos mangás e da cultura pop japonesa no Ocidente retorna em uma nova edição especial. Após atropelar uma criança de aparência estranha, Tetsuo Shima (o melhor amigo de Kaneda), começa a sentir algumas reações anormais. Isso acaba chamando a atenção do governo que está projetando diversas experiências secretas e acabam sequestrando Tetsuo. Nesta aventura cheia de ficção, Kaneda entra em cena para salvar o amigo, enquanto uma terrível e monstruosa entidade ameaça despertar.",
	 * //   "dimensions": {
	 * //     "width": 17.5,
	 * //     "height": 25.7,
	 * //     "unit": "CENTIMETER"
	 * //   },
	 * //   "year": 2017,
	 * //   "format": "PHYSICAL",
	 * //   "page_count": 364,
	 * //   "subjects": [
	 * //     "Cartoons; caricaturas e quadrinhos",
	 * //     "mangá",
	 * //     "motocicleta",
	 * //     "gangue",
	 * //     "Delinquência"
	 * //   ],
	 * //   "location": "SÃO PAULO, SP",
	 * //   "retail_price": null,
	 * //   "cover_url": null,
	 * //   "provider": "cbl"
	 * // }
	 * ```
	 */
	public async getLivro(isbn: string, providers: string) {
		const response = await this.http.get<ISBNInfo>(
			`/v1/${isbn}?providers=${providers}`
		);

		return response.data;
	}
}
